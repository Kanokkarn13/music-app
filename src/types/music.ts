export type Label = { label: string };
export type WithAttributes<T = {}> = { attributes: T };

export type HrefAttr = {
  rel: string;
  href: string;
  type?: string;
  title?: string;
  ["im:assetType"]?: string;
};


export type RssImage = Label & WithAttributes<{ height: string }>;

export type RssContentType =
  | (WithAttributes<{ term: string; label: string }> & {
      ["im:contentType"]: WithAttributes<{ term: string; label: string }>;
    })
  | null;

export type RssLink = { attributes: HrefAttr } & { ["im:duration"]?: Label };


export type RssEntry = {
  ["im:name"]: Label;
  ["im:image"]?: RssImage[];
  ["im:collection"]?: {
    ["im:name"]: Label;
    link?: { attributes: HrefAttr };
    ["im:contentType"]?: RssContentType;
  };
  ["im:price"]?: Label & WithAttributes<{ amount: string; currency: string }>;
  ["im:contentType"]?: RssContentType;
  rights?: Label;
  title: Label;
  link: RssLink | RssLink[]; 
  id: Label & WithAttributes<{ ["im:id"]: string }>;
  ["im:artist"]: Label & Partial<WithAttributes<{ href: string }>>;
  category?: { attributes: { ["im:id"]: string; term: string; scheme: string; label: string } };
  ["im:releaseDate"]?: Label & WithAttributes<{ label: string }>;
  ["im:itemCount"]?: Label;
};

// feed
export type ItunesTopSongsFeed = {
  feed: {
    author: { name: Label; uri: Label };
    entry?: RssEntry[]; 
    updated: Label;
    rights: Label;
    title: Label;
    icon: Label;
    link: Array<{ attributes: HrefAttr }>;
    id: Label;
  };
};

export type ItunesTopAlbumsFeed = {
  feed: {
    author: { name: Label; uri: Label };
    entry?: RssEntry[];
    updated: Label;
    rights: Label;
    title: Label;
    icon: Label;
    link: Array<{ attributes: HrefAttr }>;
    id: Label;
  };
};


export type ItunesLookupAlbum = {
  collectionId: number;
  collectionName: string;
  artistName: string;
  artworkUrl100?: string;
};

export type ItunesLookupTrack = {
  wrapperType?: "track";
  kind?: "song";
  trackId: number;
  trackName: string;
  artistName: string;
  collectionName: string;
  artworkUrl100?: string;
  trackViewUrl?: string;
  previewUrl?: string;
  primaryGenreName?: string;
  releaseDate?: string;
  trackNumber?: number;
  discNumber?: number;
  trackTimeMillis?: number;
};

export type ItunesLookupResponse = {
  resultCount: number;
  results: Array<ItunesLookupAlbum | ItunesLookupTrack>;
};


export type Track = {
  id: string;               
  title: string;
  artist: string;
  album?: string;
  artworkUrl?: string;
  previewUrl?: string;
  pageUrl?: string;
  artistUrl?: string;
  priceLabel?: string;
  priceAmount?: number;
  currency?: string;
  categoryId?: string;
  category?: string;
  releaseDate?: string;
  releaseDateLabel?: string;

  
  trackNumber?: number;
  discNumber?: number;
  durationMs?: number; 
};

export type Album = {
  id: string;
  title: string;
  artist: string;
  artworkUrl?: string;
  pageUrl?: string;
  releaseDate?: string;
  releaseDateLabel?: string;
  category?: string;
  categoryId?: string;
  itemCount?: number; 
};