'use strict';

// This plugin will open a modal to prompt the user to enter a number, and
// it will then create that many rectangles on the screen.

// This file holds the main code for the plugins. It has access to the *document*.
// You can access browser APIs in the <script> tag inside "ui.html" which has a
// full browser enviroment (see documentation).

// This shows the HTML page in "ui.html".
figma.showUI(__html__, {themeColors: true, width: 310, height: 143});

var fontsLoaded = false;

async function getCharWidth(paragraphNode){
    const textNode = figma.createText();
    await figma.loadFontAsync(paragraphNode.fontName);
  
    // Set the text
    textNode.fontSize = paragraphNode.fontSize;
    textNode.characters = "The quick brown fox jumps over the lazy dog";
  
    // Get the width of the text node and divide it by the number of characters
    let avgCharWidth = textNode.width / textNode.characters.length;
    
    textNode.remove();
    return avgCharWidth;
  }

async function breakTextIntoLines(paragraphNode, frames) {
    const fontName = paragraphNode.fontName;
    
    try {
      await figma.loadFontAsync(fontName);
    } catch (error) {
      figma.closePlugin(`Error: ${error.message}`);
      return;
    }
  
    
    const fontSize = paragraphNode.fontSize;
    
  
  
    let lines = await getLines(paragraphNode);
  
    let currentY = paragraphNode.y;
    let allFrames = [];
    let lineCount = 1;
    for (let lineText of lines) {
      const lineNode = figma.createText();
  
      lineNode.characters = lineText;
      lineNode.x = paragraphNode.x;
      lineNode.y = currentY;
      lineNode.lineHeight = paragraphNode.lineHeight;
      lineNode.fontSize = fontSize;
      lineNode.fontName = fontName;
      lineNode.textAlignHorizontal = paragraphNode.textAlignHorizontal;
      lineNode.textAlignVertical = paragraphNode.textAlignVertical;
      lineNode.fills = paragraphNode.fills; // Apply the fill style from the original node
      lineNode.name = lineCount+"_"+lineText;
  

      if(frames){
        // Create a frame for the lineNode
        const frame = figma.createFrame();
        frame.name = lineCount+"_"+lineNode.name;
        frame.x = lineNode.x;
        frame.y = lineNode.y;
        frame.resize(lineNode.width, lineNode.height);
        frame.appendChild(lineNode);
        frame.fills = []; // Remove fill
        frame.clipsContent = true; // Enable content clipping
        lineNode.x = 0 ;
        lineNode.y= 0;
        paragraphNode.parent.appendChild(frame);
        allFrames.push(frame);
      }else {
        paragraphNode.parent.appendChild(lineNode);
        allFrames.push(lineNode);
      }

  
      // Update the Y position for the next line node
      // Get the line height
        let lineHeightPixel = 0;
        const lineHeight = lineNode.lineHeight;
        if (lineHeight.unit === 'PIXELS') {
            lineHeightPixel = lineHeight.value;
        } else if (lineHeight.unit === 'PERCENT') {
            lineHeightPixel = (lineHeight.value / 100) * fontSize;
        } else {
            console.error(`Unsupported line height unit: ${lineHeight.unit}`);
        }

        // Update the Y position for the next line node
        currentY += lineHeightPixel;
        lineCount++;
    }
    
     // Create a parent frame to contain all created frames or lineNodes
     const parentFrame = figma.createFrame();
     parentFrame.x = allFrames[0].x;
     parentFrame.y = allFrames[0].y;
     parentFrame.fills = [];  // Remove fill
     parentFrame.name = paragraphNode.name;

     // Copy the original paragraphNode
    const paragraphNodeCopy = paragraphNode.clone();
    paragraphNodeCopy.name = "original_copy_block";
    paragraphNodeCopy.x -= parentFrame.x;
    paragraphNodeCopy.y -= parentFrame.y;

    // Append the copy of the original paragraphNode to the parent frame
    parentFrame.appendChild(paragraphNodeCopy);
    //hide it
    paragraphNode.visible = false;
 
     // Append all frames or lineNodes to the parent frame
     for (let frame of allFrames) {
         // Update frame's position relative to the parent frame
         frame.x -= parentFrame.x;
         frame.y -= parentFrame.y;
         parentFrame.appendChild(frame);
     }
 
     // Resize the parent frame to fit its content
     parentFrame.resizeWithoutConstraints(
         Math.max(...allFrames.map(frame => frame.x + frame.width)),
         Math.max(...allFrames.map(frame => frame.y + frame.height))
     );
 
     // Add the parent frame to the document
     paragraphNode.parent.appendChild(parentFrame);
     paragraphNode.remove();

  }

  async function getLines(paragraphNode){

     const rawLines = paragraphNode.characters.split('\n');
     const boxWidth = paragraphNode.width;

     // Estimation of average character width
     const avgCharWidth = await getCharWidth(paragraphNode);
    
     // Estimation of maximum characters per line
     const charsPerLineEst = Math.floor(boxWidth / avgCharWidth);
   
     let lines = [];
   
     for (let rawLine of rawLines) {
       while (rawLine.length > charsPerLineEst) {
         // If a word would be cut in the middle, break at the previous space
         let breakIndex = charsPerLineEst;
         while (breakIndex > 0 && rawLine[breakIndex] !== ' ') {
           breakIndex--;
         }
   
         // If no space was found, fallback to cutting at charsPerLineEst
         if (breakIndex === 0) {
           breakIndex = charsPerLineEst;
         }
   
         lines.push(rawLine.slice(0, breakIndex));
         rawLine = rawLine.slice(breakIndex).trim(); // Trim leading spaces
       }
       lines.push(rawLine);
     }

     return lines;
    
  }

  figma.ui.onmessage = async function (msg) {

    console.log({msg});

    if (msg.type === 'break-lines') {

      const selection = figma.currentPage.selection;

      if (selection.length === 1 && selection[0].type === 'TEXT') {
        const paragraphNode = selection[0];

        if(!fontsLoaded){
          await loadFonts(paragraphNode);
        }
        
        
        breakTextIntoLines(paragraphNode, msg.frames);
        paragraphNode.visible = false;

      } else {
        figma.notify('Please select a single text node.');
      }

    } else {
      figma.closePlugin('Be careful who you Break-up with.');
    }

    
};

async function loadFonts(paragraphNode) {
      await figma.loadFontAsync({ family: "Inter", style: "Regular" });
      await figma.loadFontAsync(paragraphNode.fontName);
      fontsLoaded = true;
}


// Function to notify user of the currently selected layer
async function notifySelection() {

  
  const selection = figma.currentPage.selection;
  if (selection.length === 1) {
      const layerName = selection[0].name;

      // Check if the selected layer is a text layer
      if (selection[0].type === 'TEXT') {
          
          if(!fontsLoaded){
            await loadFonts(selection[0]);
          }
        
          const lines = await getLines(selection[0]);
          // figma.notify(`Selected text layer: ${layerName}, number of lines: ${lines.length}`);
          figma.ui.postMessage({type: 'lineUpdate', data: {lineCount:lines.length}});
      } else {
          figma.notify(`This is not a text layer you can break up with.`);
          figma.ui.postMessage({type: 'lineUpdate', data: {lineCount:0}});
      }
  } else {
      figma.ui.postMessage({type: 'lineUpdate', data: {lineCount:0}});
  }
}




// Notify the user of their initial selection when the plugin is launched
notifySelection();

// Update the notification each time the user changes their selection
figma.on("selectionchange", notifySelection);
