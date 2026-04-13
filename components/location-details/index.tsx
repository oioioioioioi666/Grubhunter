import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Button from "@/components/button";
import styles from "./index.module.css";
import { LocationType } from "@/mongoose/locations/schema";

interface WishlistInterface {
  locationId: string;
  userId: string;
}

interface Props {
  location: LocationType;
}

const LocationDetails = ({ location }: Props) => {
  const { data: session } = useSession();
  const [onWishlist, setOnWishlist] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const userId = session?.user?.fdlst_private_userId;

    setOnWishlist(
      Boolean(
        userId &&
          location?.on_wishlist &&
          location.on_wishlist.includes(userId)
      )
    );
  }, [session, location]);

  async function wishlistAction({ locationId, userId }: WishlistInterface) {
    if (loading) return;

    setLoading(true);

    const mutationName = onWishlist
      ? "removeLocationFromWishlist"
      : "addLocationToWishlist";

    const query = `
  mutation {
    ${mutationName}(location_id: "${locationId}", user_id: "${userId}") {
      location_id
    }
  }
`;
    try {
      const response = await fetch("/api/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      });

      if (response.ok) {
        setOnWishlist(!onWishlist);
      }
    } finally {
      setLoading(false);
    }
  }

  if (!location) return null;

  return (
    <>
      <ul className={styles.root}>
        <li><strong>Address:</strong> {location.address}</li>
        <li><strong>Zipcode:</strong> {location.zipcode}</li>
        <li><strong>Borough:</strong> {location.borough}</li>
        <li><strong>Cuisine:</strong> {location.cuisine}</li>
        <li><strong>Grade:</strong> {location.grade}</li>
      </ul>

      {session?.user?.fdlst_private_userId ? (
  <Button
    disabled={loading}
    variant={onWishlist ? "outline" : "blue"}
    clickHandler={() =>
      wishlistAction({
        locationId: String((location as any).location_id),
        userId: session.user.fdlst_private_userId as string,
      })
    }
  >
    {onWishlist
      ? "Remove from your Wishlist"
      : "Add to your Wishlist"}
  </Button>
) : null}
    </>
  );
};

export default LocationDetails;