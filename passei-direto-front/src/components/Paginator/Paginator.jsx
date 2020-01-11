import React, { useState, useEffect } from 'react';
import './Paginator.scss';

export default function Paginator(props) {
  const [current, setCurrent] = useState(props.current);
  const [pagesCount, setPagesCount] = useState(props.pagesCount);
  const [pageAroundCount] = useState(props.pageAroundCount);

  useEffect(() => {
    setPagesCount(props.pagesCount);
  }, [props.pagesCount]);

  const onClickPageNumber = number => {
    if (number !== current) {
      setCurrent(number);
      props.onChange(number);
    }
  };

  const printPagesSmall = () => {
    let elements = [];
    const count = current - pageAroundCount > 0 ? current - pageAroundCount : 1;
    for (
      let i = count;
      i <= current + pageAroundCount && i <= pagesCount;
      i++
    ) {
      elements.push(
        i === current ? (
          <label
            key={i}
            id="current_page_number"
            onClick={() => onClickPageNumber(i)}
          >
            {i}
          </label>
        ) : (
          <label key={i} id="page_number" onClick={() => onClickPageNumber(i)}>
            {i}
          </label>
        )
      );
    }

    if (current === pagesCount && current - pageAroundCount > 1) {
      const pageToInsert = current - pageAroundCount - 1;

      elements.unshift(
        <label
          key={pageToInsert}
          id="page_number"
          onClick={() => onClickPageNumber(pageToInsert)}
        >
          {pageToInsert}
        </label>
      );
    }

    if (current === 1 && current + pageAroundCount < pagesCount) {
      const pageToInsert = current + pageAroundCount + 1;

      elements.push(
        <label
          key={pageToInsert}
          id="page_number"
          onClick={() => onClickPageNumber(pageToInsert)}
        >
          {pageToInsert}
        </label>
      );
    }

    elements.push(
      <label
        key="last"
        id="page_aux"
        onClick={() => onClickPageNumber(pagesCount)}
      >
        >
      </label>
    );
    elements.unshift(
      <label key="first" id="page_aux" onClick={() => onClickPageNumber(1)}>
        {'<'}
      </label>
    );
    return elements;
  };

  return <div id="paginator"> {printPagesSmall()}</div>;
}
