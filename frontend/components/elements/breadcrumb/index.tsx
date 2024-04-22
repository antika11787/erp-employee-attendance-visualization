import React from 'react';
import Link from 'next/link';
import { FaAngleRight } from "react-icons/fa6";
import './index.scss';

interface BreadcrumbItem {
    text: string;
    href: string;
}

interface BreadcrumbProps {
    items: BreadcrumbItem[];
}

const Breadcrumb = ({ items }: BreadcrumbProps) => {
    return (
        <nav aria-label="breadcrumb" className="breadcrumb">
            <ol className="list">
                {items.map((item, index) => (
                    <li key={index} className="item">
                        {index !== items.length - 1 ? (
                            <div className='link-wrapper'>
                                <Link href={item.href} className='link'>
                                    {item.text}
                                </Link>
                                <FaAngleRight className='link-circle' />
                            </div>
                        ) : (
                            <span className="current">{item.text}</span>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
};

export default Breadcrumb;
