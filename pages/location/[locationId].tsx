import Head from "next/head";
import { GetServerSideProps } from "next";
import LocationDetails from "@/components/location-details";
import { findLocationById } from "@/mongoose/locations/services";
import { LocationType } from "@/mongoose/locations/schema";

interface Props {
  location: string;
}

const LocationDetailPage = ({ location }: Props) => {
  const parsedLocation: LocationType = JSON.parse(location);

  return (
    <>
      <Head>
        <title>{parsedLocation.name}</title>
      </Head>

      <div>
        <h1>{parsedLocation.name}</h1>
        <LocationDetails location={parsedLocation} />
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const locationId = context.params?.locationId as string;
  const location = await findLocationById({ id: locationId });

  if (!location) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      location: JSON.stringify(location),
    },
  };
};

export default LocationDetailPage;