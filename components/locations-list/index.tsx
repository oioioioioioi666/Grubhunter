import styles from "./index.module.css";
import LocationsListItem from "../locations-list-item";
import type { LocationType } from "@/mongoose/locations/schema";

interface Props {
  locations: LocationType[];
}

const LocationsList = ({ locations }: Props) => {
  return (
    <ul className={styles.root}>
      {locations.map((location) => (
        <LocationsListItem
          key={location.location_id}
          location={location}
        />
      ))}
    </ul>
  );
};

export default LocationsList;