const axios = require('axios');
const qs = require('qs');
const FormData = require('form-data');  // Import FormData package

// Controller for handling login requests
exports.OverseesSignin = async (req, res) => {
    const { email, password } = req.query; 
console.log(email, password)
    const apiUrl = 'http://api.overseetracking.com/WebProcessorApi.ashx';
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      Origin: 'http://www.overseetracking.com/', 
    };
  
    // Create the form data payload
    const body = qs.stringify({
      Token: '',
      OperationType: 'SignIn',
      InformationType: 'User',
      LanguageType: '2B72ABC6-19D7-4653-AAEE-0BE542026D46',
      Arguments: JSON.stringify({ UserName: email, Password: password }),
    });
  
    try {
      // Make POST request to the external API
      const response = await axios.post(apiUrl, body, { headers });
      console.log(response?.data)
      res.status(200).json({ success: true, data: response?.data?.Token });
    } catch (error) {
      console.error('Error occurred during login:', error.message);
  
      // Handle network or API errors
      if (error.response) {
        res.status(error.response.status).json({
          success: false,
          error: error.response.data,
        });
      } else if (error.request) {
        res.status(500).json({
          success: false,
          error: 'No response received from the server',
        });
      } else {
        res.status(500).json({
          success: false,
          error: error.message,
        });
      }
    }
  };

  exports.GetTrackerData = async (req, res) => {
    const { token } = req.query;
  
    // Ensure the token is provided
    if (!token) {
      return res.status(400).json({ success: false, message: 'Token is required' });
    }
  
    const apiUrl = 'http://api.overseetracking.com/WebProcessorApi.ashx';
  
    // Create the payload using qs.stringify
    const body = qs.stringify({
      Token: token,
      OperationType: 'GetMyTracker',
      InformationType: 'Product',
      LanguageType: '2B72ABC6-19D7-4653-AAEE-0BE542026D46',
      Arguments: JSON.stringify({"TrackerType":"0"}), 
    });
  
    // Set the headers for the POST request
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      Origin: 'http://www.overseetracking.com/',
    };
  
    try {
        console.log(apiUrl, body, { headers })
      // Send the POST request to the API
      const response = await axios.post(apiUrl, body, { headers });
  
      // Log response for debugging
      console.log('Response from API:', response.data);
  
      // Return the response data to the client
      res.status(200).json({ success: true, data: response.data });
    } catch (error) {
      console.error('Error occurred:', error.message);
  
      // Handle errors from the external API
      if (error.response) {
        res.status(error.response.status).json({
          success: false,
          error: error.response.data,
        });
      } else if (error.request) {
        res.status(500).json({
          success: false,
          error: 'No response received from the server',
        });
      } else {
        res.status(500).json({
          success: false,
          error: error.message,
        });
      }
    }
  };
  