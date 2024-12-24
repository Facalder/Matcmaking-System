import { Table, Pagination } from "flowbite-react";
import { useEffect, useState } from "react";

export default function DataPlayerTable({ playerData }) {
   const data = playerData.map(player => ({
   Id: player.Id,
   Name: player.name,
   MMR: player.MMR,
   Rank: player.Rank,
   Role: player.Role,
 }));

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return playerData.slice(startIndex, endIndex);
  };

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      {!playerData ? (
        <p>kosong</p>
      ) : (
        <div className="space-y-4">
          <Table>
            <Table.Head className="top-0 sticky">
              <Table.HeadCell>Id</Table.HeadCell>
              <Table.HeadCell>Name</Table.HeadCell>
              <Table.HeadCell>Rank</Table.HeadCell>
              <Table.HeadCell>MMR Point</Table.HeadCell>
              <Table.HeadCell>Role</Table.HeadCell>
            </Table.Head>

            <Table.Body className="divide-y">
              {getCurrentPageData().map((items, index) => (
                <Table.Row key={index}>
                  <Table.Cell>{items.Id}</Table.Cell>
                  <Table.Cell>{items.Name}</Table.Cell>
                  <Table.Cell>{items.Rank}</Table.Cell>
                  <Table.Cell>{items.MMR}</Table.Cell>
                  <Table.Cell>{items.Role}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>

          {totalPages > 1 && (
            <div className="flex justify-between items-center pb-2">
              <p className="font-medium text-gray-500">Total All Players Data: {data.length}</p>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={onPageChange}
              />
            </div>
          )}
        </div>
      )}
    </>
  );
}
