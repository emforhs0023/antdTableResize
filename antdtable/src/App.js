import React,{ useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { Table } from 'antd';
import 'antd/dist/antd.css';

const columns = [
	{
	  title: 'pgNm',
	  dataIndex: 'pgNm',
	},
	{
	  title: 'pgVariant',
	  dataIndex: 'pgVariant',
	},
];

function App() {

	let aa= null;
	let tableWidth;
	let column
	


	useEffect(() => {
		aa = window.document.getElementsByTagName('table')[0]
		if(aa != undefined){
			aa.setAttribute('data-table-resizable', 'true');
			let id = 'rs_tb';
			aa.id = id;
			resizeable();
			clearColumnsWidth()
		}
	}, [])
		
	
	
	function resizeable() {
		let header = aa.rows[0];
		let cells = header.cells;
		let len = cells.length;
	
		for (let i = 0; i < len; i++) {
			cells[i].addEventListener('mousedown', handleMousedown);
			cells[i].addEventListener('mousemove', handleMousemove, true);
		  	cells[i].addEventListener('mouseleave', handleMouseLeave);
		}
		aa.addEventListener('mouseup', handleMouseup);
	}
	
	function handleMousedown(event) {
		let target = event.currentTarget;
		column = target;
		if (event.offsetX > target.offsetWidth - 10) {
			target.mouseDown = true;
			target.oldX = event.x;
			target.oldWidth = target.offsetWidth;
		}
		tableWidth = aa.rows[0].clientWidth;
	}
	
	function handleMousemove(event) {
		let target = event.currentTarget;
		if (event.offsetX > target.offsetWidth - 10) {
			target.style.cursor = 'col-resize';
		} else {
			target.style.cursor = 'default';
		}
		if (!column) {
			column = target;
		}
		let column1 = column;
		if (column1.mouseDown) {
			column1.style.cursor = 'default';
			var diff = (event.x - column1.oldX);
			if (column1.oldWidth + (event.x - column1.oldX) > 0) {
				column1.width = column1.oldWidth + diff + 30;
		  	}
	
		  	column1.style.width = column1.width;
		  	aa.style.width = tableWidth + diff + 30 + 'px';
		  	column1.style.cursor = 'col-resize';
		}
	}
	
	function handleMouseup(event){
		if (column) {
			column.mouseDown = false;
			column.style.cursor = 'default';
		}
	}
	
	
	function clearColumnsWidth() {
		let colgroup = null;
		let childNodes = aa.childNodes;
		
		childNodes.forEach(node => {
			if (node.tagName === 'COLGROUP') {
				colgroup = node;
		  	}
		});
		if (colgroup) {
		  	colgroup.childNodes.forEach(node => {
				node.style.width = 'auto'
		  	});
		}
	}

	function handleMouseLeave(event){
		if (column) {
			column.mouseDown = false;
			column.style.cursor = 'default';
		}
	}


	return (
		<div>
			<Table  
				columns={columns}
				className="table1"
			/>;
		</div>
	);
}

export default App;
