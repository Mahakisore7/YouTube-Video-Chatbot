# onlychats.rfc
Submissions repository for `ASOC11` - [https://github.com/acm-avv/onlychats.rfc](https://github.com/acm-avv/onlychats.rfc)

> [!NOTE]
All discussions regarding `ASOC11: YouTube Video Chatbot` shall take place at [https://github.com/orgs/acm-avv/discussions/1](https://github.com/orgs/acm-avv/discussions/1).

## Overview
In-order to be eligible to work on this project as **Request for Code** under the banner of **Amrita Summer of Code, 2025**, you are required to form a team of size 1-4 and have all the members register at [amsoc.vercel.app](https://amsoc.vercel.app)

## Project Manager Details
@sharathcx
```json
"Name": "Sarath Chandra",
"Year": "4th",
"Roll": "CB.EN.U4CSE22437",
"GitHub": "@sharathcx",
```

## How to Apply
Type out a message with the following details at [https://github.com/orgs/acm-avv/discussions/1](https://github.com/orgs/acm-avv/discussions/1):
1. Team Name
2. Team Members' Names, Roll-Numbers and respective GitHub usernames
3. Tag the project manager as **@username**

## Guidelines
1. Keep all discussions limited to this discussion channel by tagging the project manager via **@username**
2. Do not try to contact the project manager personally unless they are open to it.
4. Maintain decorum and avoid any misbehavior with the project manager. This can be subjected to disqualification.
5. Send us an update every week with regards to your progress for your respective project. If we do not receive an update for more than 10 days then your team will be disqualified automatically.

## Project Description
### Core Functionality:
- **YouTube Video Input**: Users can provide a link to any popular YouTube video.
- **Transcript Extraction**: The application will automatically extract the full transcript of the provided YouTube video using yt-dlp.
- **Conversational AI (RAG)**: A RAG application will be built to enable users to ask questions and converse naturally with the extracted transcript. This allows for in-depth understanding and information retrieval from the video's spoken content.

### Key Technical Challenges:
- **Transcript Retrieval**: Efficiently fetching the complete transcript from YouTube via yt-dlp.
- **Transcript Parsing**: Handling various transcript formats and ensuring accurate parsing of timestamps and text.
- **Data Cleaning**: Pre-processing the raw transcript data to remove noise, correct inconsistencies, and format it for optimal use by the RAG model (e.g., handling speaker changes, filler words, or ASR errors).
- **Making Data Available**: Storing and indexing the cleaned transcript data in a way that is easily retrievable and usable by the RAG system for real-time querying.
