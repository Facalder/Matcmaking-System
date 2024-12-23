import { Table, Pagination } from "flowbite-react";
import { useEffect, useState } from "react";
import { randomizePlayer } from "../../server/controller/PlayerController";

export default function DataPlayerTable() {
  const [playerData, setPlayerData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 50;

  useEffect(() => {
    const items = randomizePlayer();

    if (items) {
      setPlayerData(items);
    }
  }, []);

  const totalPages = Math.ceil(playerData.length / itemsPerPage);

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
      {playerData && playerData.length != 0 ? (
        <div className="flex flex-col gap-4">
          <Table hoverable>
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

          {/* Tambahkan komponen Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={onPageChange}
              />
            </div>
          )}
        </div>
      ) : (
        <p>Data Kosong!</p>
      )}
    </>
  );
}
