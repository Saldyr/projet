import { Link } from "react-router-dom";
import DeleteMatchButton from "./DeleteMatchButton";
import { matchRoutes } from "./match.utils";

type MatchOwnerActionsProps = {
    matchId: number;
};

const MatchOwnerActions = ({ matchId }: MatchOwnerActionsProps) => {
    return (
        <>
            <Link
                to={matchRoutes.edit(matchId)}
                className="btn btn-outline btn-primary btn-sm"
            >
                Modifier
            </Link>
            <DeleteMatchButton matchId={matchId} />
        </>
    );
};

export default MatchOwnerActions;
