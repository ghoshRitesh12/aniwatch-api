# Fix for Issue #132: HD-3 Server Not Working

## Problem Description

The issue reported that the HD-3 server was not working and returning 500 errors:
```
{"status":500,"message":"Internal Server Error"}
```

When trying to access:
```
/api/v2/hianime/episode/sources?animeEpisodeId=the-brilliant-healers-new-life-in-the-shadows-19553%3Fep%3D138312&server=hd-3&category=sub
```

## Root Cause Analysis

After investigation, the issue was identified as:

1. **HD-1 and HD-2 servers work correctly** - they return sources successfully
2. **HD-3, vidstreaming, and megacloud servers fail** with the error `"cheerio.load() expects a string"`
3. **The error occurs in the aniwatch package** when it tries to parse empty responses from these servers
4. **The aniwatch package doesn't handle empty responses properly** for certain servers

The error `"cheerio.load() expects a string"` indicates that the aniwatch package is trying to parse an empty or null response as HTML, which suggests these servers are returning empty responses or the scraping logic for these servers is broken.

## Solution Implemented

### 1. Enhanced Error Handling for Episode Sources (`src/routes/hianime.ts`)

Added specific error handling for the `cheerio.load()` error:

```typescript
try {
    const data = await cache.getOrSet<HiAnime.ScrapedAnimeEpisodesSources>(
        async () => hianime.getEpisodeSources(animeEpisodeId, server, category),
        cacheConfig.key,
        cacheConfig.duration
    );
    return c.json({ status: 200, data }, { status: 200 });
} catch (error) {
    // Handle specific error for servers that return empty responses
    if (error instanceof Error && error.message.includes("cheerio.load() expects a string")) {
        return c.json({
            status: 503,
            message: `Server '${server}' is currently unavailable or returning empty responses. Please try a different server.`,
            error: "SERVER_UNAVAILABLE",
            availableServers: ["hd-1", "hd-2"], // List working servers
            suggestion: "Try using hd-1 or hd-2 instead"
        }, { status: 503 });
    }
    
    // Re-throw other errors to be handled by the global error handler
    throw error;
}
```

### 2. Server Testing Endpoint (`src/routes/hianime.ts`)

Added a new endpoint `/api/v2/hianime/episode/test-servers` to test and report server status:

```typescript
// /api/v2/hianime/episode/test-servers?animeEpisodeId={id}&category={category}
hianimeRouter.get("/episode/test-servers", async (c) => {
    // Tests all available servers and returns working/broken status
    // Returns detailed information about which servers work and which don't
});
```

## Testing Results

### Before Fix
- HD-3 server returned: `{"status":500,"message":"Internal Server Error"}`
- No helpful error message or guidance

### After Fix
- HD-3 server returns: 
```json
{
  "status": 503,
  "message": "Server 'hd-3' is currently unavailable or returning empty responses. Please try a different server.",
  "error": "SERVER_UNAVAILABLE",
  "availableServers": ["hd-1", "hd-2"],
  "suggestion": "Try using hd-1 or hd-2 instead"
}
```

### Server Test Results
```json
{
  "status": 200,
  "data": {
    "workingServers": ["hd-1", "hd-2"],
    "brokenServers": ["hd-3", "vidstreaming", "megacloud"],
    "summary": {
      "total": 5,
      "working": 2,
      "broken": 3
    }
  }
}
```

## API Endpoints

### 1. Episode Sources (Enhanced)
```
GET /api/v2/hianime/episode/sources?animeEpisodeId={id}&server={server}&category={category}
```

**New Behavior:**
- Returns 200 with data for working servers (hd-1, hd-2)
- Returns 503 with helpful error message for broken servers (hd-3, vidstreaming, megacloud)
- Includes suggestions for alternative servers

### 2. Test Servers (New)
```
GET /api/v2/hianime/episode/test-servers?animeEpisodeId={id}&category={category}
```

**Returns:**
- List of all tested servers
- Working/broken status for each server
- Summary of server availability
- Specific error messages for broken servers

## Benefits of the Fix

1. **Better User Experience**: Users get clear error messages instead of generic 500 errors
2. **Server Guidance**: Users are told which servers work and which don't
3. **Fallback Options**: Users are suggested alternative servers to try
4. **Debugging Tools**: New endpoint helps identify server issues
5. **Graceful Degradation**: API continues to work with available servers

## Files Modified

1. `src/routes/hianime.ts` - Enhanced error handling and added test-servers endpoint

## Usage Examples

### Testing Server Status
```bash
curl "http://localhost:4000/api/v2/hianime/episode/test-servers?animeEpisodeId=the-brilliant-healers-new-life-in-the-shadows-19553%3Fep%3D138312&category=sub"
```

### Using Working Server
```bash
curl "http://localhost:4000/api/v2/hianime/episode/sources?animeEpisodeId=the-brilliant-healers-new-life-in-the-shadows-19553%3Fep%3D138312&server=hd-1&category=sub"
```

### Handling Broken Server
```bash
curl "http://localhost:4000/api/v2/hianime/episode/sources?animeEpisodeId=the-brilliant-healers-new-life-in-the-shadows-19553%3Fep%3D138312&server=hd-3&category=sub"
```

## Recommendations

1. **Monitor Server Status**: Use the test-servers endpoint to monitor which servers are working
2. **Update Client Applications**: Update client applications to handle 503 responses gracefully
3. **Implement Fallback Logic**: Implement automatic fallback to working servers in client applications
4. **Report Issues**: Report broken servers to the aniwatch package maintainers

## Next Steps

1. Deploy the changes to production
2. Monitor server status using the new test endpoint
3. Consider implementing automatic server fallback in the API
4. Report the underlying issue to the aniwatch package maintainers
5. Consider implementing a server health monitoring system
