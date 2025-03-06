def post(content, media=None):
    """
    Post to Instagram (placeholder function)
    In a real implementation, this would use the Instagram API
    """
    print(f"Posting to Instagram: {content[:30]}...")
    
    # Simulate API call
    import time
    time.sleep(1)  # Simulate network delay
    
    # Return mock response
    return {
        "success": True,
        "post_id": f"ig_{int(time.time())}",
        "platform": "instagram",
        "url": "https://instagram.com/p/mock-post-id"
    } 