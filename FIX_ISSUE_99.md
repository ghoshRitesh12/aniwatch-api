# Fix for Issue #99: HD-2 Links Not Working

## Problem Description

The issue reported that HD-2 server links were not working and returning broken/invalid URLs:
```
url: 'https://eb.netmagcdn.com:2228/hls-playback/956424324722cac6f59daaedcd3f7cb98d4c6d0c23a884b5ac591d926e679c767c468e4a47aaced985cc3d96d77353a98af7938f4fea0029fe29755d340affb6fae43926cfa354378a275ed78e5df6d2ccfe05356008dcc242d8536d1989480c453679302375cb2ad58a8bd6fa7290a2161b25538574adf6d6702c400b5a42eb54b84e1fe6ad21dc2d925300cd70200b/master.m3u8'
```

## Root Cause Analysis

After investigation, the issue was identified as:

1. **The original URLs were expired/broken** - The specific URLs mentioned in the issue return "410 Gone"
2. **The aniwatch package has been updated** - It now returns different, working URLs
3. **Streaming URLs require specific headers** - They need Referer and User-Agent headers to work properly
4. **The API wasn't providing guidance** - Users didn't know which headers to use

## Current Status

### ✅ **Issue is Partially Resolved**
- The aniwatch package now returns working URLs
- HD-2 server is functioning correctly
- URLs are valid but require proper headers

### 🔧 **Enhanced Solution Implemented**

## Solution Implemented

### 1. Enhanced Episode Sources Response (`src/routes/hianime.ts`)

Added streaming information to help users understand how to use the URLs:

```typescript
const enhancedData = {
    ...data,
    streamingInfo: {
        note: "Streaming URLs may require specific headers to work properly",
        requiredHeaders: data.headers || {},
        commonHeaders: {
            "Referer": data.headers?.Referer || "https://hianimez.to/",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
        },
        troubleshooting: {
            "403 Forbidden": "Add the Referer header from the response",
            "404 Not Found": "URL may have expired, try refreshing the episode",
            "CORS Error": "Use a proxy or add appropriate CORS headers"
        }
    }
};
```

### 2. Streaming Validation Endpoint (`src/routes/hianime.ts`)

Added `/api/v2/hianime/episode/validate-streaming` to test and validate streaming URLs:

```typescript
// Tests each source URL and provides detailed validation results
// Returns working/broken status for each source
// Provides troubleshooting recommendations
```

## Testing Results

### Original Issue URL
```bash
curl -I "https://eb.netmagcdn.com:2228/hls-playback/.../master.m3u8"
# Returns: HTTP/1.1 410 Gone
```

### Current Working URL
```bash
curl -I -H "Referer: https://megaplay.buzz/stream/s-2/..." "https://cdn.dotstream.buzz/anime/.../master.m3u8"
# Returns: HTTP/2 200 OK
```

### API Response Enhancement
```json
{
  "status": 200,
  "data": {
    "sources": [...],
    "streamingInfo": {
      "note": "Streaming URLs may require specific headers to work properly",
      "requiredHeaders": {
        "Referer": "https://megaplay.buzz/stream/s-2/..."
      },
      "commonHeaders": {
        "Referer": "https://megaplay.buzz/stream/s-2/...",
        "User-Agent": "Mozilla/5.0..."
      },
      "troubleshooting": {
        "403 Forbidden": "Add the Referer header from the response",
        "404 Not Found": "URL may have expired, try refreshing the episode",
        "CORS Error": "Use a proxy or add appropriate CORS headers"
      }
    }
  }
}
```

## API Endpoints

### 1. Enhanced Episode Sources
```
GET /api/v2/hianime/episode/sources?animeEpisodeId={id}&server={server}&category={category}
```

**New Features:**
- Includes streaming information and required headers
- Provides troubleshooting guidance
- Lists common headers needed for streaming

### 2. Streaming Validation (New)
```
GET /api/v2/hianime/episode/validate-streaming?animeEpisodeId={id}&server={server}&category={category}
```

**Returns:**
- Validation status for each source URL
- Working/broken source count
- Detailed troubleshooting recommendations
- Required headers for each source

## Usage Examples

### Getting Episode Sources with Streaming Info
```bash
curl "http://localhost:4000/api/v2/hianime/episode/sources?animeEpisodeId=no-longer-allowed-in-another-world-19247%3Fep%3D128244&server=hd-2&category=sub"
```

### Validating Streaming URLs
```bash
curl "http://localhost:4000/api/v2/hianime/episode/validate-streaming?animeEpisodeId=no-longer-allowed-in-another-world-19247%3Fep%3D128244&server=hd-2&category=sub"
```

### Using Streaming URLs with Proper Headers
```bash
# Get the episode sources
EPISODE_DATA=$(curl -s "http://localhost:4000/api/v2/hianime/episode/sources?animeEpisodeId=no-longer-allowed-in-another-world-19247%3Fep%3D128244&server=hd-2&category=sub")

# Extract the streaming URL and required headers
STREAMING_URL=$(echo $EPISODE_DATA | jq -r '.data.sources[0].url')
REFERER=$(echo $EPISODE_DATA | jq -r '.data.headers.Referer')

# Use the URL with proper headers
curl -H "Referer: $REFERER" "$STREAMING_URL"
```

## Benefits of the Fix

1. **Better User Experience**: Users get clear guidance on how to use streaming URLs
2. **Header Information**: Required headers are provided in the API response
3. **Troubleshooting**: Clear guidance for common streaming issues
4. **Validation Tools**: New endpoint to test and validate streaming URLs
5. **Future-Proof**: Handles URL changes and provides fallback guidance

## Common Issues and Solutions

### 403 Forbidden Error
**Problem**: Server blocks requests without proper headers
**Solution**: Add the Referer header from the API response

### 404 Not Found Error
**Problem**: URL has expired or changed
**Solution**: Refresh the episode or try a different server

### CORS Error
**Problem**: Browser blocks cross-origin requests
**Solution**: Use a proxy or add appropriate CORS headers

### 410 Gone Error
**Problem**: URL has been permanently removed
**Solution**: The aniwatch package has been updated to provide new URLs

## Files Modified

1. `src/routes/hianime.ts` - Enhanced episode sources response and added validation endpoint

## Recommendations

1. **Update Client Applications**: Use the enhanced API response to get required headers
2. **Implement Header Handling**: Always include Referer and User-Agent headers when streaming
3. **Use Validation Endpoint**: Test streaming URLs before using them in production
4. **Handle URL Changes**: Implement fallback logic for when URLs change
5. **Monitor Streaming Health**: Use the validation endpoint to monitor streaming availability

## Next Steps

1. Deploy the changes to production
2. Update client applications to use the enhanced API response
3. Implement automatic header handling in client applications
4. Monitor streaming URL health using the validation endpoint
5. Consider implementing automatic URL refresh for expired URLs
