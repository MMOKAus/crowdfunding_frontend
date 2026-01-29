import { oneFundraiser } from "../data";

function FundraiserPage() {
    return (
                <div>
                    <h2>{oneFundraiser.title}</h2>
                    <h3>Created at: {oneFundraiser.date_created}</h3>
                    <h3>{`Status: ${oneFundraiser.is_open}`}</h3>
                    <h3>Pledges:</h3>
                    <ul>
                        {oneFundraiser.pledges.map((pledgeData, key) => {
                            return (
                                <li key={key}>
                                    {pledgeData.amount} from {pledgeData.supporter}
                                </li>
                            );
                        })}
                    </ul>
                </div>
            );
        }
        
export default FundraiserPage;