import {create} from 'zustand';
import {CategoriesProps} from "../../components/Categories";
import { PlatformsProps } from '../../components/Games/Games';
export interface DataProps {
    id: number;
    name:string;
    playtime: number;
    platforms: [{platform: {id:number, name: string, slug:string}, requirements: {minimum: string, recommended: string}}];
    released: string;
    background_image: string;
    metacritic: number;
    tags: [{id: number, name: string, slug: string}];
    genres: [{id:number, name:string}];
    ratings: [{id: number, title: string, count: number, percent: number}];
}
export interface SingleDataProps extends DataProps {
    description_raw: string;
    website: string;
    background_image_additional: string;
    publishers: [{id:number, name: string}];
}
export const fetchCategories = async(apiKey:string) => {
    try {
        const res = await fetch(`https://api.rawg.io/api/genres?key=${apiKey}`);
        if(!res.ok) {
            throw new Error(`Failed to fectch. Status: ${res.status}`)
        }
        const json = await res.json();
        return json;
    }
    catch (error) {
        console.log(`Can't connect to the server!`, error);
        return [];
    }
}
export const fetchPlatforms = async(apiKey:string) => {
    try {
        const res = await fetch(`https://api.rawg.io/api/platforms?key=${apiKey}`);
        if(!res.ok) {
            throw new Error(`Failed to fectch. Status: ${res.status}`)
        }
        const json = await res.json();
        return json;
    }
    catch (error) {
        console.log(`Can't connect to the server!`, error);
        return [];
    }
}
export const fetchGames = async(apiKey:string, platforms: null | string, ordering: null | string, genres: null | string, tag: null | string, currentPage:number, searching:boolean, query: string | null) => {
    try {
        const res = searching ? await fetch(`https://api.rawg.io/api/games?search=${query ? `${query}&`:``}${currentPage > 1 ? `page=${currentPage}&` : ""}&key=${apiKey}&page_size=24&ordering=-metacritic`): await fetch(`https://api.rawg.io/api/games?${genres ? `genres=${genres}&` :''}${tag ? `tags=${tag}&` :''}${platforms ? `platforms=${platforms}&`:''}${ordering ? `ordering=-${ordering}&`:''}${currentPage > 1 ? `page=${currentPage}&` : ""}key=${apiKey}&page_size=24`);
        if(!res.ok) {
            throw new Error(`Failed to fectch. Status: ${res.status}`);
        }
        const json = await res.json();
        return json;
    }
    catch (error) {
        console.log(`Can't connect to the server!`, error);
        return [];
    }
}
export const fetchRandomGames = async(apiKey:string, platforms: null | string, genres: null | string) => {
    try {
        const res = await fetch(`https://api.rawg.io/api/games?${genres ? `genres=${genres}&` :''}${platforms ? `platforms=${platforms}&`:''}&key=${apiKey}&page_size=40`);
        if(!res.ok) {
            throw new Error(`Failed to fectch. Status: ${res.status}`);
        }
        const json = await res.json();
        const resultsCount = json.count;
        const fetchedResults = [];
        for (let i = 0; i <= 2; i++) {
            try {
                const res = await fetch(`https://api.rawg.io/api/games?${genres ? `genres=${genres}&` :''}${platforms ? `platforms=${platforms}&`:''}&key=${apiKey}&page_size=40&page=${resultsCount <= 10000 ? Math.floor(Math.random() * (resultsCount / 40)) + 1 : Math.floor(Math.random() * 250) + 1}`);
                if(!res.ok) {
                    throw new Error(`Failed to fectch. Status: ${res.status}`);
                }
                const json = await res.json();
                const results = json.results;
                const randomIndex = Math.floor(Math.random() * (results.length - 1));
                fetchedResults.push(results[randomIndex])
            }
            catch (error) {
                console.log(`Can't connect to the server!`, error);
                return [];
            }
        }
        return fetchedResults;
    }
    catch (error) {
        console.log(`Can't connect to the server!`, error);
        return [];
    }
}
export const singleGame = async(apiKey:string, id: string) => {
    try {
        const res = await fetch(`https://api.rawg.io/api/games/${id}?key=${apiKey}`);
        if(!res.ok) {
            throw new Error(`Failed to fectch. Status: ${res.status}`)
        }
        const json = await res.json();
        return json;
    }
    catch (error) {
        console.log(`Can't connect to the server!`, error);
        return [];
    }
}
interface FilterProps {
    platforms: null | string;
    ordering: null | string;
    genres: null | string;
    page: number;
    tag: null | string;
}
interface useDataProps {
    apiKey: string;
    data: DataProps[] | [];
    singleData: SingleDataProps | null;
    categories: CategoriesProps[] | [];
    platforms: PlatformsProps[] | [];
    filters: FilterProps;
    darkMode: boolean;
    searching: boolean;
    searchQuery: string | null;
    setPlatform: (id:string | null) => void;
    setOrdering: (orderOption: string | null) => void;
    setMode: (mode:boolean) => void;
    setGenre: (id:string | null) => void;
    setPage: (id:number) => void;
    setTag: (id:string | null) => void;
    setCategory: (cats:CategoriesProps[]) => void;
    setPlatforms: (platforms:PlatformsProps[]) => void;
    setData: (games:DataProps[]) => void;
    setSingleData: (game:SingleDataProps) => void;
    setSearching: (mode:boolean) => void;
    setSearchQuery: (query:string | null) => void;
}
const apiKey = import.meta.env.VITE_API_KEY;
export const useData = create<useDataProps>((set) => ({
    apiKey: apiKey,
    data: [],
    singleData: null,
    categories: [],
    platforms: [],
    filters: {
        platforms: null,
        ordering: null,
        genres: null,
        page: 1,
        tag: null,
    },
    darkMode: true,
    searching: false,
    searchQuery: null,
    setPlatform: (id) => set((state) => ({filters: {...state.filters, platforms : id}})),
    setOrdering: (orderOption) => set((state) => ({filters: {...state.filters, ordering: orderOption}})),
    setMode: (mode) => set(() => ({darkMode: mode})),
    setGenre: (id) => set((state) => ({filters: {...state.filters, genres: id}})),
    setPage: (id) => set((state) => ({filters: {...state.filters, page: id}})),
    setTag: (id) => set((state) => ({filters: {...state.filters, tag: id}})),
    setCategory: (cats) => set(() => ({categories: cats})),
    setPlatforms: (platforms) => set(() => ({platforms: platforms})),
    setData: (games) => set(() => ({data: games})),
    setSingleData: (game) => set(() => ({singleData: game})),
    setSearching: (mode) => set(() => ({searching: mode})),
    setSearchQuery: (query) => set(() => ({searchQuery: query}))
}))