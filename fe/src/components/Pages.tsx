import {Pagination} from "@heroui/react";

interface PagesProps {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  totalPages: number;
}

export default function Pages({ page, setPage, totalPages }: PagesProps) {
  //const [page, setPage] = useState(1);
  //const totalPages = 3;

  return (
    <Pagination className="justify-center" size="lg">
      <Pagination.Content>
        <Pagination.Item>
          <Pagination.Previous isDisabled={page === 1 ? true : false} onPress={() => setPage((p) => p - 1)}>
            <Pagination.PreviousIcon />
            <span>Previous</span>
          </Pagination.Previous>
        </Pagination.Item>
        {Array.from({length: totalPages}, (_, i) => i + 1).map((p) => (
          <Pagination.Item key={p}>
            <Pagination.Link isActive={p === page} onPress={() => setPage(p)}>
              {p}
            </Pagination.Link>
          </Pagination.Item>
        ))}
        <Pagination.Item>
          <Pagination.Next isDisabled={page === totalPages ? true : false} onPress={() => setPage((p) => p + 1)}>
            <span>Next</span>
            <Pagination.NextIcon />
          </Pagination.Next>
        </Pagination.Item>
      </Pagination.Content>
    </Pagination>
  );
}