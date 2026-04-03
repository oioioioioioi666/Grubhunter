import Head from "next/head";
import type { GetStaticProps } from "next";
import LocationsList from "@/components/locations-list";
import connectMongo from "@/middleware/mongoose";
import { findAllLocations } from "@/mongoose/locations/services";
import type { LocationType } from "@/mongoose/locations/schema";

interface Props {
  locations: string;
}

const HomePage = ({ locations }: Props) => {
  const parsedLocations: LocationType[] = JSON.parse(locations);
  const pageTitle = "All Locations";

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content="List of all locations" />
      </Head>

      <main>
        <h1>{pageTitle}</h1>
        <LocationsList locations={parsedLocations} />
      </main>
    </>
  );
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  await connectMongo();
  const locations = await findAllLocations();

  return {
    props: {
      locations: JSON.stringify(locations),
    },
  };
};

export default HomePage;