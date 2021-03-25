import React, { useState, useEffect } from "react";
import { Button } from "bootstrap";
//import PropTypes from "prop-types";
// la app usa enter para ingresar cada tarea
//create your first component
export function Home() {
	const [list, setlist] = useState([]);
	useEffect(() => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/kevrdgz")
			.then(response => response.json())
			.then(result => setlist(result))
			.catch(error => console.log("error", error));
	}, []);

	useEffect(() => {
		methodPut(list);
	}, [list]);

	function myFunction(e) {
		if (e.key === "Enter") {
			setlist([...list, { label: e.target.value, done: false }]);
		}
	}

	const methodPut = lista => {
		var myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");

		var raw = JSON.stringify(lista);

		var requestOptions = {
			method: "PUT",
			headers: myHeaders,
			body: raw,
			redirect: "follow"
		};

		fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/kevrdgz",
			requestOptions
		)
			.then(response => response.text())
			.then(result => console.log(result))
			.catch(error => console.log("error", error));
	};

	async function deleteALL() {
		//delete
		await fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/kevrdgz",
			{
				method: "DELETE",
				headers: {
					"Content-Type": "application/json"
				}
			}
		)
			.then(response => response.text())
			.then(result => console.log(result))
			.catch(error => console.log("error", error));

		//POST

		var myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");

		var raw = JSON.stringify([]);

		var requestOptions = {
			method: "POST",
			headers: myHeaders,
			body: raw,
			redirect: "follow"
		};

		await fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/kevrdgz",
			requestOptions
		)
			.then(response => response.text())
			.then(result => console.log(result))
			.catch(error => console.log("error", error));

		//GET
		fetch("https://assets.breatheco.de/apis/fake/todos/user/kevrdgz")
			.then(response => response.json())
			.then(result => setlist(result))
			.catch(error => console.log("error", error));
	}

	const DeleteItems = indexItem => {
		setlist(prevState =>
			prevState.filter((todo, index) => index !== indexItem)
		);
	};
	return (
		<div id="main">
			<h1>To Do List</h1>

			<input
				type="text"
				placeholder="What needs to be done?"
				onKeyDown={event => myFunction(event)}
				className="m-2"
			/>
			<ul className="list-group list-group-flush">
				{list.map((item, index) => {
					return (
						<li
							className="list-group-item bg-transparent"
							key={index}>
							{item.label}{" "}
							<button
								className="btn btn-danger m-3"
								onClick={() => DeleteItems(index)}>
								X
							</button>
						</li>
					);
				})}
				<div id="espacio"></div>
				<p>{list.length + "   item left"}</p>
				<div id="espacio"></div>
			</ul>
			<button className="btn btn-danger m-3" onClick={() => deleteALL()}>
				Delete List
			</button>
		</div>
	);
}
