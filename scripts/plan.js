function drukuj() {
}

function createSelect(options) {
	let form = document.createElement('form');
	let select = document.createElement('select');
	for (const [key, value] of Object.entries(options)) {
		let option = document.createElement('option');
		option.setAttribute('value', key);
		option.innerText = value;

		select.appendChild(option);
	}
	select.addEventListener('change', (e) => {
		this.location = select.value;
	});

	let body = document.querySelector('body');
	form.appendChild(select);
	body.appendChild(form);
	body.prepend(form);
}

document.addEventListener('DOMContentLoaded', (event) => {
	//	document.querySelectorAll('style, link[rel="stylesheet"], td.op').forEach(element => element.parentNode.removeChild(element));
		document.querySelectorAll('style, td.op').forEach(element => element.parentNode.removeChild(element));
		document.querySelectorAll('div[align="center"]').forEach(element => element.removeAttribute('align'));
		document.querySelectorAll('table').forEach(table => table.removeAttribute('cellpadding') || table.removeAttribute('cellspacing'));
		document.querySelectorAll('[style]').forEach(element => element.removeAttribute('style'));
	
		document.querySelectorAll('a.n').forEach(element => element.classList.add('n-'+element.innerText.trim().toLowerCase()));
		document.querySelectorAll('a.s').forEach(element => element.classList.add('s-'+element.innerText.trim().toLowerCase().replaceAll(" ", "")));
		document.querySelectorAll('span.p').forEach(element => {
			let className = element.innerText.trim().toLowerCase().replaceAll(' ', '');
			if (className.indexOf('-') > 0) {
				className = className.substring(0, className.indexOf('-'));
			}
			element.classList.add('p-'+className.replaceAll('.', '-'))
		});
		let lastLink = Array.from(document.querySelectorAll('a')).pop().parentNode;
		lastLink.parentNode.removeChild(lastLink);
	
		let title = document.querySelector('td.tytul');
		let newCaption = document.createElement('caption');
		newCaption.innerText = title.innerText;
	
		document.querySelector('table').remove();
		document.querySelector('table').appendChild(newCaption);
	
		let trs = document.querySelectorAll('table.tabela tbody tr');
		let tbody = document.querySelector('table.tabela tbody');
		let g = document.createElement('div');
		g.classList.add('grider');

		const tbl = document.createElement('table');
		const tr = tbl.insertRow();
		
		for (let j = 0; j < 6; j++) {
			const td = tr.insertCell();
			if(j===0){
				td.appendChild(document.createTextNode("Nr"));
			}else{
				td.setAttribute("class","btn")
				td.setAttribute("tabindex","0")
				if(j===1){
					td.setAttribute("class","btn select")
				}
				td.appendChild(document.createTextNode(tbody.firstChild.querySelectorAll(':nth-child(n+3)')[j-1].innerText));
			}
			td.style.border = '1px solid black';
		}
		for (let i = 1; i < trs.length; i++) {
			const tr = tbl.insertRow();
			for (let j = 0; j < 2; j++) {
				const td = tr.insertCell();
				td.style.border = '1px solid black';
				if(j===1){
					td.setAttribute("colspan","5")
					td.setAttribute("class","lesson")
					td.innerHTML = trs[i].childNodes[5].innerHTML;
				}else{
					td.appendChild(document.createTextNode(i+'.'));
				}
			}
		}
	  	g.appendChild(tbl);
	 	document.body.appendChild(g);
	
		const lessons = document.querySelectorAll('.lesson')
		
		g.addEventListener("click", (element) => {
			if(element.target.classList.value === "btn"){
				let parent = element.target.parentNode;
				let ar = Array.prototype.indexOf.call(parent.children, element.target)*2+3
				for (let i = 1; i < trs.length; i++){
					lessons[i-1].innerHTML = trs[i].childNodes[ar].innerHTML
				}
					
			}
			element.target.parentNode.childNodes.forEach(element => {
				element.classList.remove("select");
			})
			element.target.classList.add("select")
		})
		fetch('../scripts/plans.json').then(j => j.json()).then(createSelect);
	});
