/**
 * Content script for the Webpage Clipper extension
 * Extracts page content and sends it to the background script
 */

// Function to extract text content from the DOM
function extractTextContent(doc) {
<<<<<<< HEAD
  // Get all text nodes from the body
  const bodyText = doc.body.innerText || doc.body.textContent || '';
  
  // Limit to first 100 words
  const words = bodyText.split(/\s+/);
  const firstHundredWords = words.slice(0, 100).join(' ');
  
  return firstHundredWords + (words.length > 100 ? '...' : '');
=======

  // Get all text nodes from the body
  const bodyText = doc.body.innerText || doc.body.textContent || '';
  
  // Count total words
  const words = bodyText.split(/\s+/);
  const wordCount = words.length;
  
  // Calculate estimated reading time (average 200 words per minute)
  const readingTime = Math.ceil(wordCount / 200);
  
  // Limit to first 100 words for content preview
  const firstHundredWords = words.slice(0, 100).join(' ') + (words.length > 100 ? '...' : '');
  
  return {
    content: firstHundredWords,
    wordCount: wordCount,
    readingTime: readingTime
  };
>>>>>>> 07708dd (Initial commit)
}

// Function to clip the current page
function clipCurrentPage() {
<<<<<<< HEAD
=======
  // Get favicon URL (if available)
  let faviconUrl = '';
  const faviconLink = document.querySelector('link[rel="icon"], link[rel="shortcut icon"]');
  if (faviconLink) {
    faviconUrl = faviconLink.href;
  }
  
  // Extract text content with metrics
  const textData = extractTextContent(document);
  
>>>>>>> 07708dd (Initial commit)
  const pageData = {
    title: document.title,
    url: window.location.href,
    timestamp: new Date().toISOString(),
<<<<<<< HEAD
    content: extractTextContent(document)
=======
    content: textData.content,
    favicon: faviconUrl,
    wordCount: textData.wordCount,
    readingTime: textData.readingTime
>>>>>>> 07708dd (Initial commit)
  };
  
  // Send the data to the background script
  chrome.runtime.sendMessage({
    action: 'clipPage',
    data: pageData
  }, response => {
    if (response && response.success) {
      console.log('Page clipped successfully');
    } else {
      console.error('Failed to clip page');
    }
  });
}

// Listen for messages from popup or background
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  // Respond to ping to check if content script is loaded
  if (message.action === 'ping') {
    sendResponse({ success: true });
    return;
  }
  
  if (message.action === 'clipPage') {
    clipCurrentPage();
    sendResponse({ success: true });
  }
});
