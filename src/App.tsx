import React, { useState } from 'react';
import { Table, Tag, Dropdown, Menu, Input, Button } from 'antd';
import { SearchOutlined, EllipsisOutlined, DownOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import CustomPagination from './components/customPagination.tsx';
import type { MenuProps } from 'antd';
import CustomModal from './components/customModal.tsx';

interface DataType {
  key: string;
  name: string;
  tags: string[];
  contain: string;
  level: string;
  date: string;
}

// Sample data
const data: DataType[] = [
  {
    key: '1',
    name: 'Foreign Bid Acquisition',
    tags: ['BEC', 'Banking', 'CEO', 'User account', 'Job offers'],
    contain: 'Link',
    level: 'Normal',
    date: '2023-03-10',
  },
  // Can be more rows as needed
];

const App: React.FC = () => {
  const [searchText, setSearchText] = useState<string>('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<string | null>(null);

  const onSearch = (value: string) => setSearchText(value);

  const handleMenuClick: MenuProps['onClick'] = (e) => {
    if (e.key === '0') { 
      setModalContent('Edit');
      setIsModalVisible(true);
    }
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setModalContent(null);
  };

  const handleTagSelect = ({ key }: { key: string }) => {
    setSelectedTags((prevTags) =>
      prevTags.includes(key) ? prevTags.filter((t) => t !== key) : [...prevTags, key]
    );
  };

  const tagOptions = ['Banking', 'Job offers', 'Packages', 'Invoice', 'Network management', 'Analytics team'];

  const filteredData = data.filter((item) => {
    const matchesSearchText = item.name.toLowerCase().includes(searchText.toLowerCase());
    const matchesTags = selectedTags.length
      ? selectedTags.every((tag) => item.tags.includes(tag))
      : true;
    return matchesSearchText && matchesTags;
  });

  const tagMenu = (
    <Menu onClick={handleTagSelect}>
      {tagOptions.map((tag) => (
        <Menu.Item key={tag}>
          <Tag
            className={`rounded-full px-3 py-1 ${selectedTags.includes(tag) ? 'bg-teal-500 text-white' : 'bg-gray-200 text-gray-600'}`}
          >
            {tag}
          </Tag>
        </Menu.Item>
      ))}
    </Menu>
  );

  const actionMenu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="0">Edit</Menu.Item>
      <Menu.Item key="1">Preview</Menu.Item> 
    </Menu>
  );

  const columns: ColumnsType<DataType> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (text: string) => <span className="font-semibold">{text}</span>,
    },
    {
      title: 'Tags',
      dataIndex: 'tags',
      key: 'tags',
      render: (tags: string[]) => (
        <>
          {tags.map((tag) => {
            let colorClass = tag === 'BEC' ? 'bg-yellow-500 text-white' : 'bg-blue-500 text-white';
            if (tag === 'Data Protection') colorClass = 'bg-purple-600 text-white';
            return (
              <Tag className={`rounded-md px-2 py-1 ${colorClass}`} key={tag}>
                {tag}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: 'Contain',
      dataIndex: 'contain',
      key: 'contain',
    },
    {
      title: 'Level',
      dataIndex: 'level',
      key: 'level',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      sorter: (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    },
    {
      title: '',
      key: 'action',
      render: () => (
        <Dropdown overlay={actionMenu} trigger={['click']} overlayClassName="custom-dropdown">
          <EllipsisOutlined className="text-xl cursor-pointer" />
        </Dropdown>
      ),
    },
  ];

  

  return (
    <div className="p-5 font-sans">
      <Dropdown overlay={tagMenu} trigger={['click']}>
        <Button type="primary" className="mb-4">
          Tags <DownOutlined />
        </Button>
      </Dropdown>
      <div className="mb-4 space-x-2">
        {selectedTags.map((tag) => (
          <Tag
            key={tag}
            className="rounded-full px-3 py-1 bg-teal-500 text-white"
            closable
            onClose={() => setSelectedTags(selectedTags.filter((t) => t !== tag))}
          >
            {tag}
          </Tag>
        ))}
      </div>
      <Input
        placeholder="Search text"
        prefix={<SearchOutlined className="text-gray-400" />}
        className="mb-4 w-72 rounded-md px-4 py-2 bg-gray-100"
        onChange={(e) => onSearch(e.target.value)}
      />
      <Table<DataType>
        columns={columns}
        dataSource={filteredData}
        pagination={false}
        rowKey="key"
        className="rounded-lg overflow-hidden"
      />
      <CustomPagination
        current={currentPage}
        pageSize={10}
        total={100} // logical explanation is filteredData.length but for sample view it's mocked 
        onChange={(page) => setCurrentPage(page)}
      />
      <CustomModal
        isVisible={isModalVisible}
        content={modalContent}
        onClose={handleModalClose}
      />
    </div>
  );
};

export default App;
