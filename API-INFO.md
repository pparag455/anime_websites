# 🎌 Anime API Integration

## External Anime API Used

This project now uses **Jikan API** (MyAnimeList API) to fetch anime data and images.

### Benefits:
- ✅ **No setup required** - Works immediately without Supabase configuration
- ✅ **Free API** - No authentication needed
- ✅ **Real anime data** - Actual anime titles, images, descriptions, ratings
- ✅ **Automatic images** - High-quality anime images from MyAnimeList

### API Details:
- **Base URL**: `https://api.jikan.moe/v4`
- **Documentation**: https://docs.api.jikan.moe/
- **Rate Limit**: 3 requests/second, 60 requests/minute
- **No API Key Required**

## How It Works

1. **Home Page**: Fetches featured anime (Naruto, One Piece, Attack on Titan, etc.)
2. **Shop Page**: Shows top/popular anime from MyAnimeList
3. **Category Filter**: Searches for anime matching the category name
4. **Detail Page**: Shows full anime information including rating and episodes

## Anime Categories Mapped

- **Naruto** → Searches "Naruto"
- **One Piece** → Searches "One Piece"
- **Attack on Titan** → Searches "Shingeki no Kyojin"
- **Dragon Ball** → Searches "Dragon Ball"
- **Demon Slayer** → Searches "Kimetsu no Yaiba"
- **My Hero Academia** → Searches "Boku no Hero Academia"
- **Jujutsu Kaisen** → Searches "Jujutsu Kaisen"

## Supabase Still Used For

- User authentication (login/signup)
- Order history storage
- User profiles

**Note**: If Supabase is not configured, the site will still work for browsing anime, but login/orders won't function.

## Image Sources

All images come from:
- `cdn.myanimelist.net` - Official MyAnimeList CDN
- High-resolution anime artwork
- Automatically updated when anime data refreshes

## Caching

- API responses are cached for 1 hour
- Reduces API calls and improves performance
- Images are cached by Next.js Image component

---

**The site now works immediately without any Supabase setup for browsing anime!** 🎉

