import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL ?? '';
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY ?? '';

//console.log({supabaseUrl, supabaseAnonKey})

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export function GetUserState() {
    return supabase.auth.user();
}

export interface RegistryItem{
    id: number | null,
    registryId: string,
    title: string,
    description: string,
    productLink: string,
    imageLink: string,
    purchased: boolean,
}

interface Registry{
    id: string | null,
    name: string,
    createdAt: Date | null
}


export async function CreateRegistry(registry: Registry) : Promise<Registry | null>{
    const { data, error } = await supabase.from('registries').insert([
        {name: registry.name}
    ]);

    if (error){
        console.error(error)
        return null;
    }

    console.log(data);

    return {
        id: data[0]?.id,
        name: data[0]?.name ?? '',
        createdAt: data[0]?.created_at
    };
}

export async function GetRegistry(id: string) : Promise<Registry | null>{

    const { data: registries, error } = await supabase
        .from('registries')
        .select("*")
        .eq('id', id);

    if (error){
        console.error(error);
        return null;
    }

    return {
        id: registries[0]?.id,
        name: registries[0]?.name,
        createdAt: registries[0]?.created_at,
    };
}

export async function GetList(registryId: string) : Promise<RegistryItem[] | null>  {
    let { data: items, error } = await supabase
        .from('items')
        .select("*")
        .eq('registry_id',registryId);

    if (error){
        console.error(error)
        return null;
    }

    console.log(items);

    return items?.map(item => {
        return {
            id: item.id,
            registryId: item.registry_id,
            title: item.title,
            description: item.description,
            productLink: item.product_link,
            imageLink: item.image_link,
            purchased: item.purchased,
        }
    }) as RegistryItem[];
}

export async function AddItem(item: RegistryItem) : Promise<RegistryItem | null>{
    const { data, error } = await supabase
    .from('items')
    .insert([
        {
            registry_id: item.registryId,
            title: item.title,
            description: item.description,
            product_link: item.productLink,
            image_link: item.imageLink,
            purchased: false,
        },
    ]) ;

    if (error){
        console.error(error)
        return null;
    }

    return {
        id: data[0]?.id,
        registryId: data[0]?.registry_id,
        title: data[0]?.title,
        description: data[0]?.description,
        productLink: data[0]?.product_link,
        imageLink: data[0]?.image_link,
        purchased: data[0]?.purchased,
    };

}