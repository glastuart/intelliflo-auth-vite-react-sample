import React from "react";
import useSWR from "swr";
import fetcher from "../fetcher";
import { useAuth } from "react-oidc-context";
import type { IntellifloClient } from "../types/IntellifloClient";

type ClientsTableResponse = IntellifloListResponse<IntellifloClient>;

const ClientsTable = () : React.ReactNode => {
    const { user } = useAuth();
    const { data, error, isLoading } = useSWR<ClientsTableResponse>(`/api/iflo/clients`, (url: string) => fetcher(url, user?.access_token ?? null));

    if (isLoading) {
        return <div>LOADING</div>
    }

    if (error || !data) {
        return <div>ERROR</div>
    }

    return (
        <div className="my-3 p-5 rounded-box border border-base-content/5">
            <div className="mb-3 mx-2">
                <h1 className="text-3xl">Clients ({data?.count ?? 0})</h1>
                <p>Communicating with <span className="font-mono">/v2/clients</span> to return a list of clients.</p>
            </div>
            <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Adviser</th>
                            <th>Created At</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.items?.map(client => (
                            <tr key={client.id}>
                                <td>{client.name}</td>
                                <td>{client.currentAdviser?.name ?? 'N/A'}</td>
                                <td>{client.createdAt}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ClientsTable;