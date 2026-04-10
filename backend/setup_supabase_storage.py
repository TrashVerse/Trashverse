"""
Setup Supabase Storage buckets for TrashVerse
Creates waste-images and profile-images buckets
"""
from app.storage import create_storage_buckets, supabase

if __name__ == "__main__":
    print("=" * 60)
    print("🗄️  SUPABASE STORAGE SETUP")
    print("=" * 60)
    
    if not supabase:
        print("\n❌ Supabase not configured!")
        print("Please set SUPABASE_PROJECT_URL and SUPABASE_ANON_KEY in .env")
        exit(1)
    
    print("\n📦 Creating storage buckets...")
    create_storage_buckets()
    
    print("\n" + "=" * 60)
    print("✅ SETUP COMPLETE")
    print("=" * 60)
    print("\nBuckets created:")
    print("  • waste-images (public, 5MB limit)")
    print("  • profile-images (public, 5MB limit)")
    print("\nYou can now upload images through the API!")
