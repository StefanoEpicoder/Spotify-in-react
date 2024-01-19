import { useSelector } from "react-redux";
import SingleTrack from "./SingleTrack";

const MyLibrary = () => {
    const favourites = useSelector((state) => state.favourites.favourites);
    return (
        <div className="col-12 pb-3 mt-5">
            <h2 className="text-light">My Library</h2>
                {favourites.map((track) => (
                    <SingleTrack  key={track.id} track={track}/>
                ))}
        </div>
    )
}
export default MyLibrary;

