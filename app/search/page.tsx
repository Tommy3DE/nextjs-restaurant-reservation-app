import { PrismaClient } from "@prisma/client";
import React from "react";
import Header from "./components/Header";
import RestaurantCard from "./components/RestaurantCard";
import SearchSideBar from "./components/SearchSideBar";

const prisma = new PrismaClient()

const fetchRestaurantByCity = async (city: string | undefined) => {

  const select = {
    id: true,
    name: true,
    main_image: true,
    price: true,
    cuisine: true,
    location: true,
    slug: true
  }


  if(!city) {return prisma.restaurant.findMany({select})} 
  return prisma.restaurant.findMany({
    where: {
      location: {
        name: {
          equals: city.toLowerCase()
        }
      }
    },
    select
  })

}

const fetchLocations = async () =>{
  return prisma.location.findMany()
}

const fetchCuisine = async () =>{
  return prisma.cuisine.findMany()
}

const Search = async ({searchParams}: {searchParams: {city: string}}) => {
  const restaurants = await fetchRestaurantByCity(searchParams.city)
  const locations = await fetchLocations()
  const cuisines = await fetchCuisine()

  return (
    <>
      <Header />
      <div className="flex py-4 m-auto w-2/3 justify-between items-start">
        <SearchSideBar locations={locations} cuisines={cuisines}/>
        <div className="w-5/6">
          {restaurants.length ? (
            <>
            {
              restaurants.map((restaurant)=>
              (<RestaurantCard restaurant={restaurant}/>))
              
            }
            </>) : 
            <p>Sorry we found no restaurants</p>
          }
        </div>
      </div>
    </>
  );
};

export default Search;
