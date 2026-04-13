import Head from "next/head";
import { GetServerSideProps } from "next";
import { useSession } from "next-auth/react";
import connectMongo from "@/middleware/mongoose";
import { findWishlistLocations } from "@/mongoose/locations/services";
import LocationsList from "@/components/locations-list";

interface WishListPageProps {
  locations: any[];
  userId: string;
}

export default function WishListPage({
  locations,
  userId,
}: WishListPageProps) {
  const { data: session } = useSession();

  const currentUserId = session?.user?.fdlst_private_userId;
  const isOwnList = currentUserId === userId;

  return (
    <>
      <Head>
        <title>{isOwnList ? "Your Wish List" : "Wish List"}</title>
      </Head>

      <main>
        <h1>{isOwnList ? "Your Wish List" : "User Wish List"}</h1>

        {locations.length === 0 ? (
          <p>Your wish list is empty.</p>
        ) : (
          <LocationsList locations={locations} />
        )}
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const userId = context.query.userId as string;

  try {
    await connectMongo();
    const locations = await findWishlistLocations({ userId });

    return {
      props: {
        locations: JSON.parse(JSON.stringify(locations)),
        userId,
      },
    };
  } catch (error) {
    return {
      props: {
        locations: [],
        userId,
      },
    };
  }
};