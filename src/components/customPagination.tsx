import React from 'react';
import { Pagination } from 'antd';

interface CustomPaginationProps {
  current: number;
  pageSize: number;
  total: number;
  onChange: (page: number) => void;
}

const CustomPagination: React.FC<CustomPaginationProps> = ({ current, pageSize, total, onChange }) => {
  return (
    <Pagination
      current={current}
      pageSize={pageSize}
      total={total}
      onChange={onChange}
      showSizeChanger={false}
      className="custom-pagination flex justify-end mt-4"
      itemRender={(page, type, originalElement) => {
        if (type === 'page') {
          const isActive = page === current;
          return (
            <div
              className={`${
                isActive
                  ? 'bg-sky-100 text-sky-700 border-sky-400 rounded-full'
                  : 'bg-white text-gray-500'
              } px-3 py-1 mx-1 cursor-pointer transition-colors duration-150`}
            >
              {page}
            </div>
          );
        }
        return originalElement;
      }}
    />
  );
};

export default CustomPagination;