// import { Category } from '@/payload-types';
import configPromise from '@payload-config'
import { getPayload } from 'payload'

import { Footer } from "./footer";
import { Navbar } from "./navbar";
import { SearchFilters } from "./search-filters";
import { CustomCategory } from './types';

// Define a local Category type

type Category = {
  id: string;
  name: string;
  slug: string;
  color?: string;
  parent?: string;
  subcategories?: Category[];
  // Add other fields as needed
};

interface Props{
  children: React.ReactNode
};

const Layout= async ({ children }: Props)=> {
  const payload=await getPayload({
    config: configPromise,
  })

  const data = await payload.find({
    collection: "categories" as any,
    depth: 1, // Populate subcategories, subcategories.[0] will be a type of "Category"
    pagination: false,
    where: {
      parent: {
        exists: false,
      },
    },
    sort: "name",
  })

  const formattedData: CustomCategory[]=data.docs.map((doc)=> ({
    ...doc,
    subcategories: (doc.subcategories?.docs ?? []).map((doc: Category)=> ({

      //bcz of 'depth: 1' we are confident that doc will be a type of Category 
      ...(doc as Category),
      subcategories: undefined,
    }))
  }))

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <SearchFilters data={formattedData} />
        <div className="flex-1 bg-[#F4F4F0]">
          {children}
        </div>
      <Footer />
    </div>
  )
}

export default Layout;