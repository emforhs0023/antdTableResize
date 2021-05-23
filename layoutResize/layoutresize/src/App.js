import React, {useState, useEffect, useRef} from "react"
import "./index.css"

function App() {

	let aa= null;
	let tableWidth;
	let column
	
	const ref = useRef()
	useEffect(() => {
		aa = ref.current
		if(aa != undefined){
			aa.setAttribute('data-table-resizable', 'true');
			let id = 'rs_tb';
			aa.id = id;
			resizeable();
			// clearColumnsWidth()
		}
		// console.log(aa.children)
	}, [])

	function resizeable() {
		
		let data = ref.current.children
		let len = data.length;
		
		for (let i = 0; i < len; i++) {
			data[i].addEventListener('mousedown', handleMousedown);
			data[i].addEventListener('mousemove', handleMousemove, true);
			data[i].addEventListener('mouseleave', handleMouseLeave);
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
		console.log(column)
		tableWidth = aa.children.clientWidth;
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
		  	// aa.style.width = tableWidth + diff + 30 + 'px';
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
    	<div
			className="main"
			ref={ref}
		>
      		<div>
				1
			</div>
			<div>
				2
			</div>
    	</div>
  	);
}

export default App;
