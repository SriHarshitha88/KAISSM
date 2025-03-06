from flask import Flask, request, jsonify
from flask_cors import CORS
import schedule
import time
import threading
import json
import os
import datetime
from social_posters import instagram, linkedin, facebook, twitter, whatsapp

app = Flask(__name__)
CORS(app)

# In-memory store for posts (in production, use a database)
scheduled_posts = []
analytics_data = {}

def init_analytics():
    """Initialize analytics data structure"""
    global analytics_data
    analytics_data = {
        "platform_engagement": {
            "instagram": {"likes": 0, "comments": 0, "shares": 0},
            "linkedin": {"likes": 0, "comments": 0, "shares": 0},
            "facebook": {"likes": 0, "comments": 0, "shares": 0},
            "twitter": {"likes": 0, "comments": 0, "shares": 0, "retweets": 0},
            "whatsapp": {"views": 0, "responses": 0}
        },
        "post_performance": [],
        "audience_demographics": {
            "age": {"18-24": 25, "25-34": 30, "35-44": 20, "45-54": 15, "55+": 10},
            "gender": {"male": 48, "female": 49, "other": 3},
            "location": {"US": 40, "India": 25, "Europe": 20, "Other": 15}
        },
        "posting_activity": {
            "by_day": {"Mon": 0, "Tue": 0, "Wed": 0, "Thu": 0, "Fri": 0, "Sat": 0, "Sun": 0},
            "by_hour": {str(i): 0 for i in range(24)}
        }
    }

init_analytics()

def post_to_social_media(post_data):
    """Execute posting to respective social media platform"""
    platform = post_data.get('platform')
    content = post_data.get('content')
    media = post_data.get('media')
    
    print(f"Posting to {platform}: {content[:30]}...")
    
    result = {"success": True, "post_id": f"mock_{platform}_{int(time.time())}"}
    
    # Call the appropriate platform-specific function
    if platform == 'instagram':
        result = instagram.post(content, media)
    elif platform == 'linkedin':
        result = linkedin.post(content, media)
    elif platform == 'facebook':
        result = facebook.post(content, media)
    elif platform == 'twitter':
        result = twitter.post(content, media)
    elif platform == 'whatsapp':
        result = whatsapp.post(content, media)
    
    # Update analytics after posting
    update_analytics(platform, post_data)
    
    return result

def update_analytics(platform, post_data):
    """Update analytics data after a post is published"""
    global analytics_data
    
    # Update posting activity
    post_time = datetime.datetime.strptime(post_data.get('start'), "%Y-%m-%dT%H:%M:%S.%fZ")
    day = post_time.strftime("%a")
    hour = post_time.strftime("%H")
    
    analytics_data["posting_activity"]["by_day"][day] += 1
    analytics_data["posting_activity"]["by_hour"][hour] += 1
    
    # Simulate engagement metrics
    import random
    likes = random.randint(10, 100)
    comments = random.randint(1, 20)
    shares = random.randint(0, 15)
    
    analytics_data["platform_engagement"][platform]["likes"] += likes
    analytics_data["platform_engagement"][platform]["comments"] += comments
    analytics_data["platform_engagement"][platform]["shares"] += shares
    
    # Add to post performance data
    analytics_data["post_performance"].append({
        "post_id": post_data.get("id"),
        "title": post_data.get("title"),
        "platform": platform,
        "posted_at": post_data.get("start"),
        "engagement": {
            "likes": likes,
            "comments": comments,
            "shares": shares
        }
    })

def check_scheduled_posts():
    """Background task to check and execute scheduled posts"""
    while True:
        current_time = datetime.datetime.now().replace(microsecond=0)
        
        # Find posts that should be executed now
        for post in scheduled_posts:
            post_time = datetime.datetime.strptime(post.get('start'), "%Y-%m-%dT%H:%M:%S.%fZ")
            if post_time <= current_time and not post.get('posted', False):
                # Execute post
                result = post_to_social_media(post)
                post['posted'] = True
                post['post_result'] = result
                print(f"Posted: {post.get('title')} to {post.get('platform')}")
        
        # Run every minute
        time.sleep(60)

# Start the background scheduler thread
scheduler_thread = threading.Thread(target=check_scheduled_posts)
scheduler_thread.daemon = True
scheduler_thread.start()

@app.route('/api/posts', methods=['GET'])
def get_posts():
    """Get all scheduled posts"""
    return jsonify(scheduled_posts)

@app.route('/api/posts', methods=['POST'])
def add_post():
    """Add a new scheduled post"""
    post_data = request.json
    post_data['posted'] = False
    scheduled_posts.append(post_data)
    
    # If the post is scheduled for the past or now, post immediately
    post_time = datetime.datetime.strptime(post_data.get('start'), "%Y-%m-%dT%H:%M:%S.%fZ")
    if post_time <= datetime.datetime.now():
        result = post_to_social_media(post_data)
        post_data['posted'] = True
        post_data['post_result'] = result
    
    return jsonify({"success": True, "post": post_data})

@app.route('/api/posts/<post_id>', methods=['PUT'])
def update_post(post_id):
    """Update a scheduled post"""
    post_data = request.json
    
    for i, post in enumerate(scheduled_posts):
        if post.get('id') == post_id:
            # If the post has already been published, don't allow updates
            if post.get('posted', False):
                return jsonify({"success": False, "message": "Cannot update a post that has already been published"})
            
            scheduled_posts[i] = post_data
            return jsonify({"success": True, "post": post_data})
    
    return jsonify({"success": False, "message": "Post not found"})

@app.route('/api/posts/<post_id>', methods=['DELETE'])
def delete_post(post_id):
    """Delete a scheduled post"""
    for i, post in enumerate(scheduled_posts):
        if post.get('id') == post_id:
            del scheduled_posts[i]
            return jsonify({"success": True})
    
    return jsonify({"success": False, "message": "Post not found"})

@app.route('/api/analytics', methods=['GET'])
def get_analytics():
    """Get analytics data"""
    return jsonify(analytics_data)

if __name__ == '__main__':
    app.run(debug=True, port=5000) 