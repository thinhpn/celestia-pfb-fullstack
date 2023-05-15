import React, { useState } from "react";
import { Container, Table } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import "./ListView.css";
import dayjs from "dayjs";

function ListView(props) {
    const [pageNumber, setPageNumber] = useState(0);
    const itemsPerPage = 4;
    const pagesVisited = pageNumber * itemsPerPage;
    const pageCount = Math.ceil(props.data.length / itemsPerPage);

    const handleViewNamespaceShare = (event) => {
        const button = event.target;
        const row = button.closest("tr");
        const itemSelect = props.data.find((item) => +item.id === +row.id);
        const namespaceId = itemSelect.namespaceId;
        const height = itemSelect.height;
        if (namespaceId && height) {
            props.onButtonClick({ namespaceId, height });
        }
    };

    return (
        <Container className="table-container table-responsive">
            <Table className="table table-bordered">
                <thead>
                    <tr>
                        <th className="col">submit_time</th>
                        <th className="col">txhash</th>
                        <th className="col">height</th>
                        <th className="col">gas_used</th>
                        <th className="col">namespace_id</th>
                        <th className="col">namespaced_share</th>
                    </tr>
                </thead>
                <tbody>
                    {props.data.slice(pagesVisited, pagesVisited + itemsPerPage).map((item) => (
                        <tr key={item.id} id={item.id}>
                            <td className="col">{dayjs(item.createdAt).format("YYYY-MM-DD HH:mm:ss")}</td>
                            <td className="col">
                                <a
                                    href={`https://testnet.mintscan.io/celestia-incentivized-testnet/txs/${item.txhash}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {item.txhash}
                                </a>
                            </td>
                            <td className="col" id={item.height}>
                                {item.height}
                            </td>
                            <td className="col">{item.gasUsed}</td>
                            <td className="col" id={item.namespaceId}>
                                {item.namespaceId}
                            </td>
                            <td className="col">
                                <button className="col-button" onClick={handleViewNamespaceShare}>
                                    Retrieve the data
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <ReactPaginate
                previousLabel={"Previous"}
                nextLabel={"Next"}
                breakLabel="..."
                marginPagesDisplayed={2}
                pageRangeDisplayed={2}
                pageCount={pageCount}
                onPageChange={(page) => {
                    setPageNumber(page.selected);
                }}
                containerClassName={"pagination"}
                activeClassName={"active"}
            />
        </Container>
    );
}

export default ListView;
