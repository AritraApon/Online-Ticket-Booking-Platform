import { getLatestTickets } from '@/lib/api/latestTickets';
import React from 'react';

const LatestTickets = async() => {
    const latestTickets = await getLatestTickets();
    return (
        <div>

        </div>
    );
};

export default LatestTickets;