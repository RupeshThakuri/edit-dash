"use client"

import React, { useState } from 'react';
import Layout from '../dashLayout';
import ProjectsTable from '@/components/Projects/projectsTable';

const page = () => {

    return (
        <>
            <Layout>
                <ProjectsTable />
            </Layout>
        </>
    )
}

export default page
