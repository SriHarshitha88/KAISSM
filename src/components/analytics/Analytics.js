import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Tabs,
  Tab,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from '@mui/material';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';
import { FaInstagram, FaLinkedin, FaFacebook, FaTwitter, FaWhatsapp } from 'react-icons/fa';
import './Analytics.css';

// Sample colors for charts
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];
const PLATFORM_COLORS = {
  instagram: '#E1306C',
  linkedin: '#0077B5',
  facebook: '#1877F2',
  twitter: '#1DA1F2',
  whatsapp: '#25D366'
};

const Analytics = () => {
  // State hooks
  const [analyticsData, setAnalyticsData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const [timeFrame, setTimeFrame] = useState('week');

  // Fetch analytics data (using mock data for now)
  useEffect(() => {
    const fetchAnalytics = async () => {
      setIsLoading(true);
      try {
        // Mock data object
        const mockData = {
          platform_engagement: {
            instagram: { likes: 245, comments: 67, shares: 38 },
            linkedin: { likes: 182, comments: 42, shares: 29 },
            facebook: { likes: 210, comments: 55, shares: 41 },
            twitter: { likes: 178, comments: 31, shares: 62, retweets: 45 },
            whatsapp: { views: 310, responses: 89 }
          },
          post_performance: [
            { id: 1, title: "New Product Launch", platform: "instagram", engagement: { likes: 85, comments: 23, shares: 14 } },
            { id: 2, title: "Company Update", platform: "linkedin", engagement: { likes: 67, comments: 18, shares: 9 } },
            { id: 3, title: "Customer Testimonial", platform: "facebook", engagement: { likes: 92, comments: 31, shares: 17 } },
            { id: 4, title: "Industry News", platform: "twitter", engagement: { likes: 58, comments: 12, shares: 25, retweets: 22 } },
            { id: 5, title: "Special Offer", platform: "instagram", engagement: { likes: 110, comments: 29, shares: 18 } }
          ],
          audience_demographics: {
            age: [
              { name: "18-24", value: 25 },
              { name: "25-34", value: 30 },
              { name: "35-44", value: 20 },
              { name: "45-54", value: 15 },
              { name: "55+", value: 10 }
            ],
            gender: [
              { name: "Male", value: 48 },
              { name: "Female", value: 49 },
              { name: "Other", value: 3 }
            ],
            location: [
              { name: "US", value: 40 },
              { name: "India", value: 25 },
              { name: "Europe", value: 20 },
              { name: "Other", value: 15 }
            ]
          },
          posting_activity: {
            by_day: [
              { name: "Mon", posts: 4 },
              { name: "Tue", posts: 6 },
              { name: "Wed", posts: 5 },
              { name: "Thu", posts: 7 },
              { name: "Fri", posts: 8 },
              { name: "Sat", posts: 3 },
              { name: "Sun", posts: 2 }
            ],
            by_hour: Array.from({ length: 24 }, (_, i) => ({
              hour: i,
              posts: Math.floor(Math.random() * 5)
            }))
          },
          engagement_over_time: [
            { date: '2023-06-01', instagram: 125, linkedin: 98, facebook: 110, twitter: 85, whatsapp: 65 },
            { date: '2023-06-02', instagram: 132, linkedin: 102, facebook: 115, twitter: 90, whatsapp: 72 },
            { date: '2023-06-03', instagram: 128, linkedin: 107, facebook: 108, twitter: 88, whatsapp: 68 },
            { date: '2023-06-04', instagram: 142, linkedin: 112, facebook: 122, twitter: 96, whatsapp: 78 },
            { date: '2023-06-05', instagram: 138, linkedin: 110, facebook: 118, twitter: 92, whatsapp: 74 },
            { date: '2023-06-06', instagram: 152, linkedin: 118, facebook: 130, twitter: 102, whatsapp: 82 },
            { date: '2023-06-07', instagram: 160, linkedin: 125, facebook: 138, twitter: 110, whatsapp: 88 }
          ],
          sentiment_analysis: [
            { name: 'Positive', value: 65 },
            { name: 'Neutral', value: 25 },
            { name: 'Negative', value: 10 }
          ],
          platform_comparison: [
            { category: 'Engagement', instagram: 85, linkedin: 70, facebook: 78, twitter: 65, whatsapp: 50 },
            { category: 'Growth', instagram: 75, linkedin: 80, facebook: 65, twitter: 60, whatsapp: 70 },
            { category: 'Conversion', instagram: 60, linkedin: 85, facebook: 70, twitter: 50, whatsapp: 40 },
            { category: 'Reach', instagram: 90, linkedin: 75, facebook: 85, twitter: 80, whatsapp: 60 },
            { category: 'ROI', instagram: 80, linkedin: 90, facebook: 75, twitter: 65, whatsapp: 55 }
          ]
        };

        setAnalyticsData(mockData);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchAnalytics();
  }, [timeFrame]);

  // Handlers for tab and timeframe changes
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleTimeFrameChange = (event) => {
    setTimeFrame(event.target.value);
  };

  // Display loading, error, or empty state
  if (isLoading) return <Box p={3}>Loading analytics data...</Box>;
  if (error) return <Box p={3}>Error loading analytics: {error}</Box>;
  if (!analyticsData) return <Box p={3}>No analytics data available</Box>;

  // Helper to get platform icons
  const getPlatformIcon = (platform) => {
    switch (platform) {
      case 'instagram': return <FaInstagram color={PLATFORM_COLORS.instagram} />;
      case 'linkedin': return <FaLinkedin color={PLATFORM_COLORS.linkedin} />;
      case 'facebook': return <FaFacebook color={PLATFORM_COLORS.facebook} />;
      case 'twitter': return <FaTwitter color={PLATFORM_COLORS.twitter} />;
      case 'whatsapp': return <FaWhatsapp color={PLATFORM_COLORS.whatsapp} />;
      default: return null;
    }
  };

  return (
    <Box className="analytics-dashboard">
      {/* Header Section */}
      <Box className="analytics-header">
        <Typography variant="h4" component="h1">Analytics Dashboard</Typography>
        <Box className="analytics-controls">
          <FormControl variant="outlined" size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Time Frame</InputLabel>
            <Select
              value={timeFrame}
              onChange={handleTimeFrameChange}
              label="Time Frame"
            >
              <MenuItem value="day">Today</MenuItem>
              <MenuItem value="week">This Week</MenuItem>
              <MenuItem value="month">This Month</MenuItem>
              <MenuItem value="quarter">This Quarter</MenuItem>
              <MenuItem value="year">This Year</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>

      {/* Tabs for different analytics views */}
      <Tabs 
        value={activeTab} 
        onChange={handleTabChange} 
        className="analytics-tabs"
        variant="scrollable"
        scrollButtons="auto"
      >
        <Tab label="Overview" />
        <Tab label="Engagement" />
        <Tab label="Audience" />
        <Tab label="Content" />
        <Tab label="Platform Comparison" />
      </Tabs>

      {/* Overview Tab */}
      {activeTab === 0 && (
        <Grid container spacing={3} className="analytics-grid">
          {/* Platform Engagement Summary */}
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>Platform Engagement</Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    data={Object.entries(analyticsData.platform_engagement).map(([platform, data]) => ({
                      platform,
                      likes: data.likes || 0,
                      comments: data.comments || 0,
                      shares: data.shares || 0,
                      retweets: data.retweets || 0,
                      views: data.views || 0,
                      responses: data.responses || 0
                    }))}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="platform" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="likes" fill="#8884d8" />
                    <Bar dataKey="comments" fill="#82ca9d" />
                    <Bar dataKey="shares" fill="#ffc658" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>

          {/* Engagement Over Time */}
          <Grid item xs={12} md={8}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>Engagement Over Time</Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart
                    data={analyticsData.engagement_over_time}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="instagram" stroke={PLATFORM_COLORS.instagram} />
                    <Line type="monotone" dataKey="linkedin" stroke={PLATFORM_COLORS.linkedin} />
                    <Line type="monotone" dataKey="facebook" stroke={PLATFORM_COLORS.facebook} />
                    <Line type="monotone" dataKey="twitter" stroke={PLATFORM_COLORS.twitter} />
                    <Line type="monotone" dataKey="whatsapp" stroke={PLATFORM_COLORS.whatsapp} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>

          {/* Sentiment Analysis */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>Sentiment Analysis</Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={analyticsData.sentiment_analysis}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {analyticsData.sentiment_analysis.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {/* Engagement Tab */}
      {activeTab === 1 && (
        <Grid container spacing={3} className="analytics-grid">
          {/* Post Performance */}
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>Post Performance</Typography>
                <Box className="post-performance-list">
                  {analyticsData.post_performance.map((post) => (
                    <Box key={post.id} className="post-item">
                      <Box className="post-platform">
                        {getPlatformIcon(post.platform)}
                      </Box>
                      <Box className="post-title">
                        <Typography variant="subtitle1">{post.title}</Typography>
                      </Box>
                      <Box className="post-metrics">
                        <Box className="metric">
                          <Typography variant="body2">Likes</Typography>
                          <Typography variant="h6">{post.engagement.likes}</Typography>
                        </Box>
                        <Box className="metric">
                          <Typography variant="body2">Comments</Typography>
                          <Typography variant="h6">{post.engagement.comments}</Typography>
                        </Box>
                        <Box className="metric">
                          <Typography variant="body2">Shares</Typography>
                          <Typography variant="h6">{post.engagement.shares}</Typography>
                        </Box>
                        {post.platform === 'twitter' && (
                          <Box className="metric">
                            <Typography variant="body2">Retweets</Typography>
                            <Typography variant="h6">{post.engagement.retweets}</Typography>
                          </Box>
                        )}
                      </Box>
                    </Box>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Posting Activity by Day */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>Posting Activity by Day</Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    data={analyticsData.posting_activity.by_day}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="posts" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>

          {/* Posting Activity by Hour */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>Posting Activity by Hour</Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart
                    data={analyticsData.posting_activity.by_hour}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="hour" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="posts" stroke="#8884d8" fill="#8884d8" />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {/* Audience Tab */}
      {activeTab === 2 && (
        <Grid container spacing={3} className="analytics-grid">
          {/* Age Demographics */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>Age Demographics</Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={analyticsData.audience_demographics.age}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                    >
                      {analyticsData.audience_demographics.age.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>

          {/* Gender Demographics */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>Gender Demographics</Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={analyticsData.audience_demographics.gender}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                    >
                      {analyticsData.audience_demographics.gender.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>

          {/* Location Demographics */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>Location Demographics</Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={analyticsData.audience_demographics.location}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                    >
                      {analyticsData.audience_demographics.location.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {/* Content Tab */}
      {activeTab === 3 && (
        <Grid container spacing={3} className="analytics-grid">
          {/* Content Performance */}
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>Content Performance</Typography>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart
                    data={analyticsData.post_performance.map(post => ({
                      name: post.title,
                      likes: post.engagement.likes,
                      comments: post.engagement.comments,
                      shares: post.engagement.shares,
                      platform: post.platform
                    }))}
                    margin={{ top: 20, right: 30, left: 20, bottom: 100 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="likes" fill="#8884d8" />
                    <Bar dataKey="comments" fill="#82ca9d" />
                    <Bar dataKey="shares" fill="#ffc658" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {/* Platform Comparison Tab */}
      {activeTab === 4 && (
        <Grid container spacing={3} className="analytics-grid">
          {/* Radar Chart for Platform Comparison */}
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>Platform Performance Comparison</Typography>
                <ResponsiveContainer width="100%" height={500}>
                  <RadarChart outerRadius={150} data={analyticsData.platform_comparison}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="category" />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} />
                    <Radar
                      name="Instagram"
                      dataKey="instagram"
                      stroke={PLATFORM_COLORS.instagram}
                      fill={PLATFORM_COLORS.instagram}
                      fillOpacity={0.6}
                    />
                    <Radar
                      name="LinkedIn"
                      dataKey="linkedin"
                      stroke={PLATFORM_COLORS.linkedin}
                      fill={PLATFORM_COLORS.linkedin}
                      fillOpacity={0.6}
                    />
                    <Radar
                      name="Facebook"
                      dataKey="facebook"
                      stroke={PLATFORM_COLORS.facebook}
                      fill={PLATFORM_COLORS.facebook}
                      fillOpacity={0.6}
                    />
                    <Radar
                      name="Twitter"
                      dataKey="twitter"
                      stroke={PLATFORM_COLORS.twitter}
                      fill={PLATFORM_COLORS.twitter}
                      fillOpacity={0.6}
                    />
                    <Radar
                      name="WhatsApp"
                      dataKey="whatsapp"
                      stroke={PLATFORM_COLORS.whatsapp}
                      fill={PLATFORM_COLORS.whatsapp}
                      fillOpacity={0.6}
                    />
                    <Legend />
                  </RadarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default Analytics;