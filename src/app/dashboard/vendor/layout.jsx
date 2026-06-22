import { requireRole } from '@/lib/api/session';
import { chipVariants } from '@heroui/styles';
import React from 'react';

const VendorLayout = async({children}) => {
    await requireRole('vendor');
    return children
};

export default VendorLayout;