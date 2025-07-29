"use client";

import { Button } from "@/components/ui/button";
import { Card,CardTitle,CardDescription, CardContent} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import ThemeButton from "../theme-button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";
import { getServerSideProps } from "./service/summarize_service";
import ReactMarkdown from "react-markdown";


export default function HomePage() {

  const [url, setUrl] = useState("");
  const [summary, setSummary] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Function to convert HTML to formatted text
  const formatHtmlToText = (htmlString: string): string => {
    // Create a temporary DOM element to parse HTML
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlString;
    
    // Get text content and format it properly
    let textContent = tempDiv.textContent || tempDiv.innerText || '';
    
    // Clean up extra whitespace and format paragraphs
    textContent = textContent
      .replace(/\s+/g, ' ') // Replace multiple spaces with single space
      .trim()
      .replace(/\.\s+/g, '.\n\n') // Add line breaks after sentences for better readability
      .replace(/\*\*(.*?)\*\*/g, '$1') // Remove markdown bold formatting
      .replace(/\n\s*\n\s*\n/g, '\n\n'); // Reduce multiple line breaks
    
    return textContent;
  };
  
  return (
    
    <div className="flex items-center justify-center flex-col">
        <ThemeButton/>
      <Card className="w-full h-full flex items-center justify-center max-w-4xl">
        <CardTitle className="text-2xl mb-4">Analyze Youtube Video</CardTitle>
        <CardDescription className="text-gray-500 mb-6">
         Enter a YouTube URL to extract transcript and start conversational analysis
        </CardDescription>
        <CardContent className="w-full max-w-md">
          <p className="text-sm text-gray-500 pb-2">
            YouTube URL
          </p>
          <Input placeholder="Enter YouTube video URL" value={url} onChange={(e) => setUrl(e.target.value)} />
          <Button className="mt-4 w-full" onClick={async () => {
            if (!url) {
              alert("Please enter a valid YouTube URL");
              return;
            }
            
            setIsLoading(true);
            setSummary(""); // Clear previous summary
            
            try {
              const data = await getServerSideProps(url);

            setSummary(data.output); // Format and set the summary
            } catch (error) {
              console.error("Error fetching summary:", error);
              setSummary("Failed to fetch summary. Please try again.");
            } finally {
              setIsLoading(false);
            }
          }}>
            {isLoading ? "Analyzing..." : "Analyze Video"}
          </Button>
        </CardContent>
      </Card>
      
      {/* Expanded Summary Section */}
      <div className="w-full max-w-4xl mt-6">
        <Card className="w-full">
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-4">Video Summary</h3>
            <ScrollArea className="h-[500px] w-full rounded-md border">
              <div className="p-4">
                {isLoading ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="text-gray-500">Analyzing video...</div>
                  </div>
                ) : summary ? (
                  <div className="prose prose-sm max-w-none dark:prose-invert prose-headings:text-foreground prose-p:text-foreground prose-strong:text-foreground prose-li:text-foreground">
                    <ReactMarkdown 
                      components={{
                        p: ({ children }) => <p className="mb-4 text-foreground leading-relaxed">{children}</p>,
                        h1: ({ children }) => <h1 className="text-2xl font-bold mb-4 text-foreground">{children}</h1>,
                        h2: ({ children }) => <h2 className="text-xl font-semibold mb-3 text-foreground">{children}</h2>,
                        h3: ({ children }) => <h3 className="text-lg font-medium mb-2 text-foreground">{children}</h3>,
                        strong: ({ children }) => <strong className="font-semibold text-foreground">{children}</strong>,
                        ul: ({ children }) => <ul className="list-disc pl-6 mb-4 space-y-1">{children}</ul>,
                        li: ({ children }) => <li className="text-foreground">{children}</li>,
                      }}
                    >
                      {summary}
                    </ReactMarkdown>
                  </div>
                ) : (
                  <div className="text-gray-500 italic py-12 text-center">
                    Enter a YouTube URL and click "Analyze Video" to see the summary here.
                  </div>
                )}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}