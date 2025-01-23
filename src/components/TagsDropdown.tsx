import { useState } from "react";

//Redux
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

import { Dropdown, Spinner } from "react-bootstrap";
import FilterListIcon from '@mui/icons-material/FilterList';

interface Props {
  selectTagFn: (s:string) => void;
  forFilter: boolean;
  openModalFn?: () => void;
}

export default function TagsDropdown({ selectTagFn, forFilter, openModalFn } : Props) {
  const { tags, isLoading } = useSelector((state : RootState) => state.tag);

  const [selectedTag, setSelectedTag] = useState("");

  const handleRemoveTagFilter = () => {
    setSelectedTag("");
    selectTagFn("");
  };

  return (
    <Dropdown data-bs-theme="dark">
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        {forFilter ? <>
          <FilterListIcon className="" />
          {selectedTag == "" ? "Filter By Tag" : "Filtered By: " + selectedTag}
        </> : <>
          {selectedTag == "" ? "Add Tag" : "Selected Tag: " + selectedTag}
        </>}
        
      </Dropdown.Toggle>
      
      <Dropdown.Menu>
        {isLoading && <div className="d-flex justify-content-center align-items-center" style={{ height: "50px" }}><Spinner animation="border" /></div> }
        {selectedTag != "" && forFilter &&
          <Dropdown.Item onClick={handleRemoveTagFilter}>Remove Filter</Dropdown.Item>}
        {tags.length > 0 && tags.map((tag) => {
          return <Dropdown.Item key={tag.tagId} onClick={() => {
            selectTagFn(tag.tagId);
            setSelectedTag(tag.name);
          }}>{tag.name}</Dropdown.Item>;
        })} 
        {tags.length <= 0 && !isLoading && <Dropdown.Item disabled>No Tags Found</Dropdown.Item>}
        {!forFilter && <>
          <Dropdown.Divider />
          <Dropdown.Item onClick={openModalFn}>Create New Tag</Dropdown.Item>
        </>}
      </Dropdown.Menu>
    </Dropdown>
  );
};
