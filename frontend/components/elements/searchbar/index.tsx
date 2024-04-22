import { ChangeEventHandler } from "react";
import { IoIosSearch } from "react-icons/io";
import "./index.scss";

const Search = ({
    type,
    placeholder,
    value,
    onChange,
    searchbarContainer,
    searchInputContainer,
    searchInput,
    searchIcon,
}: {
    type?: string;
    placeholder?: string;
    value?: string;
    onChange?: ChangeEventHandler<HTMLInputElement>;
    searchbarContainer?: string;
    searchInputContainer?: string;
    searchInput?: string;
    searchIcon?: string;
}) => {
    return (
        <div className={searchbarContainer}>
            <div className={searchInputContainer}>
                <input
                    className={searchInput}
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                />
                <IoIosSearch className={searchIcon} />
            </div>
        </div>
    );
};

export default Search;
