import { useState, useRef, useEffect } from 'react';
import {
  Box,
  IconButton,
  Paper,
  Typography,
  TextField,
  Avatar,
  Collapse,
  Fade,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import ChatIcon from '@mui/icons-material/Chat';
import CloseIcon from '@mui/icons-material/Close';
import { motion } from 'framer-motion';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      text: "Hello! I'm your memory assistant. How can I help you today?",
      sender: 'bot',
    },
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (input.trim() === '') return;

    // Add user message
    const newMessages = [
      ...messages,
      { text: input, sender: 'user' },
    ];
    setMessages(newMessages);
    setInput('');

    // Simulate bot response
    setTimeout(() => {
      const botResponse = getBotResponse(input);
      setMessages([...newMessages, { text: botResponse, sender: 'bot' }]);
    }, 1000);
  };

  const getBotResponse = (userInput) => {
    const input = userInput.toLowerCase();
    
    // Chatbot-specific questions
    if (input.includes('chatbot') || 
        (input.includes('what') && input.includes('you')) ||
        (input.includes('who') && input.includes('you'))) {
      return "I'm your Memory Assistant chatbot! I'm here to help you navigate and use the Memory Tracking application. I can:\n\n" +
             "1. Explain how to use different features\n" +
             "2. Guide you through creating and managing memories\n" +
             "3. Help with account setup and management\n" +
             "4. Explain how to connect with family members\n" +
             "5. Answer questions about the app's features\n\n" +
             "Feel free to ask me anything about the application!";
    }
    
    // Website purpose and features
    if ((input.includes('what') && input.includes('website')) || 
        (input.includes('what') && input.includes('app')) ||
        input.includes('purpose')) {
      return "This is a Memory Tracking application designed to help patients with memory-related conditions and their family members. It allows you to:\n\n" +
             "1. Create and store memories (photos, voice recordings, text)\n" +
             "2. Share memories with family members\n" +
             "3. Track daily activities and routines\n" +
             "4. Access a timeline of memories\n" +
             "5. Connect with family members for support";
    }
    
    // Memory features
    if (input.includes('memory') || input.includes('memories')) {
      return "You can create different types of memories:\n\n" +
             "📸 Photo Memories: Upload and store photos with descriptions\n" +
             "🎤 Voice Memories: Record voice messages\n" +
             "📝 Text Memories: Write down your thoughts and experiences\n\n" +
             "All memories can be tagged with locations and people, and organized in a timeline.";
    }
    
    // Login/Registration help
    if (input.includes('login') || input.includes('sign in')) {
      return "To login to the Memory Tracking application:\n\n" +
             "1. Click the 'Login' button in the top right corner\n" +
             "2. Choose your account type (Patient or Family)\n" +
             "3. Enter your email address\n" +
             "4. Enter your password\n" +
             "5. Click 'Sign In'\n\n" +
             "If you've forgotten your password, you can click 'Forgot Password' to reset it.";
    }
    
    if (input.includes('register') || input.includes('sign up')) {
      return "To create a new account:\n\n" +
             "1. Click the 'Sign Up' button\n" +
             "2. Choose your account type:\n" +
             "   👤 Patient Account: For tracking your own memories\n" +
             "   👨‍👩‍👧‍👦 Family Account: For helping manage a patient's memories\n" +
             "3. Fill in your personal information\n" +
             "4. Create a secure password\n" +
             "5. Click 'Create Account'";
    }
    
    // Account management
    if (input.includes('account') || input.includes('profile') || 
        input.includes('settings')) {
      return "In your account settings, you can:\n\n" +
             "1. Update your personal information\n" +
             "2. Manage privacy settings\n" +
             "3. Connect with family members\n" +
             "4. Set up emergency contacts\n" +
             "5. Customize notification preferences";
    }
    
    // Family features
    if (input.includes('family') || input.includes('relative') || 
        input.includes('caretaker')) {
      return "As a family member, you can:\n\n" +
             "1. View and help organize the patient's memories\n" +
             "2. Add supportive comments and reactions\n" +
             "3. Monitor daily activities\n" +
             "4. Receive notifications about new memories\n" +
             "5. Help maintain the memory timeline";
    }
    
    // Help and support
    if (input.includes('help') || input.includes('support') || 
        input.includes('how')) {
      return "I can help you with:\n\n" +
             "1. Understanding the app's features\n" +
             "2. Creating and managing memories\n" +
             "3. Connecting with family members\n" +
             "4. Using the timeline and calendar\n" +
             "5. Setting up your account\n\n" +
             "What would you like to know more about?";
    }
    
    // Greetings
    if (input.includes('hello') || input.includes('hi') || 
        input.includes('hey')) {
      return "Hello! I'm your Memory Assistant. I can help you with:\n\n" +
             "1. Understanding how to use the app\n" +
             "2. Creating and managing memories\n" +
             "3. Connecting with family members\n" +
             "4. Setting up your account\n\n" +
             "What would you like to know?";
    }
    
    // Default response
    return "I'm here to help you with the Memory Tracking application. You can ask me about:\n\n" +
           "1. How to create and manage memories\n" +
           "2. Connecting with family members\n" +
           "3. Using the timeline feature\n" +
           "4. Setting up your account\n" +
           "5. Privacy and security features\n\n" +
           "What would you like to know more about?";
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 0,
        right: 20,
        zIndex: 1000,
      }}>
      {/* Chat Button */}
      {!isOpen && (
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}>
          <IconButton
            onClick={() => setIsOpen(true)}
            sx={{
              bgcolor: 'primary.main',
              color: 'white',
              '&:hover': {
                bgcolor: 'primary.dark',
              },
              width: 56,
              height: 56,
              boxShadow: 3,
            }}>
            <ChatIcon />
          </IconButton>
        </motion.div>
      )}

      {/* Chat Window */}
      <Collapse in={isOpen}>
        <Paper
          elevation={3}
          sx={{
            width: 350,
            height: 500,
            display: 'flex',
            flexDirection: 'column',
            borderRadius: 2,
            overflow: 'hidden',
          }}>
          {/* Chat Header */}
          <Box
            sx={{
              bgcolor: 'primary.main',
              color: 'white',
              p: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Avatar
                sx={{
                  bgcolor: 'white',
                  color: 'primary.main',
                  width: 32,
                  height: 32,
                }}>
                <ChatIcon fontSize="small" />
              </Avatar>
              <Typography variant="subtitle1">Memory Assistant</Typography>
            </Box>
            <IconButton
              size="small"
              onClick={() => setIsOpen(false)}
              sx={{ color: 'white' }}>
              <CloseIcon />
            </IconButton>
          </Box>

          {/* Messages */}
          <Box
            sx={{
              flex: 1,
              overflowY: 'auto',
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
            }}>
            {messages.map((message, index) => (
              <Fade in={true} key={index}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start',
                    gap: 1,
                  }}>
                  {message.sender === 'bot' && (
                    <Avatar
                      sx={{
                        bgcolor: 'primary.main',
                        color: 'white',
                        width: 32,
                        height: 32,
                      }}>
                      <ChatIcon fontSize="small" />
                    </Avatar>
                  )}
                  <Paper
                    elevation={1}
                    sx={{
                      p: 1.5,
                      maxWidth: '80%',
                      bgcolor: message.sender === 'user' ? 'primary.main' : 'grey.100',
                      color: message.sender === 'user' ? 'white' : 'text.primary',
                      borderRadius: 2,
                      whiteSpace: 'pre-line',
                    }}>
                    <Typography variant="body2">{message.text}</Typography>
                  </Paper>
                  {message.sender === 'user' && (
                    <Avatar
                      sx={{
                        bgcolor: 'primary.main',
                        color: 'white',
                        width: 32,
                        height: 32,
                      }}>
                      U
                    </Avatar>
                  )}
                </Box>
              </Fade>
            ))}
            <div ref={messagesEndRef} />
          </Box>

          {/* Input Area */}
          <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <TextField
                fullWidth
                size="small"
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                multiline
                maxRows={3}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                  },
                }}
              />
              <IconButton
                color="primary"
                onClick={handleSendMessage}
                disabled={input.trim() === ''}
                sx={{
                  alignSelf: 'flex-end',
                  bgcolor: 'primary.main',
                  color: 'white',
                  '&:hover': {
                    bgcolor: 'primary.dark',
                  },
                  '&:disabled': {
                    bgcolor: 'grey.300',
                  },
                }}>
                <SendIcon />
              </IconButton>
            </Box>
          </Box>
        </Paper>
      </Collapse>
    </Box>
  );
};

export default Chatbot; 