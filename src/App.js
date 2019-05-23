import React from 'react';
import './App.css';
import marked from 'marked';

let testText = "# Coucou\n## The best Previewer\nwhy? Because **I made it!**\n``` I code everyday\nfunction example()\n{\nreturn 42;\n}\n```";

let renderer = new marked.Renderer();

renderer.link = function (href, title, text) {
  return ('<a target="_blank" href="' + href + '">' + text + '</a>');
}

marked.setOptions({
	breaks: true,
	renderer: renderer
});

class Editor extends React.Component
{
	constructor(props)
	{
		super(props);

		this.runParentHandleChange = this.runParentHandleChange.bind(this);
	}

	runParentHandleChange(e)
	{
		this.props.handleChange(e);
	}
	render()
	{
		return (
			<div id="Editor">
				<h1>Editor</h1>
				<textarea onChange={this.runParentHandleChange} id="editor" value={this.props.value}></textarea>
			</div>
		);
	}
}

class Previewer extends React.Component
{
	render()
	{

		return (
			<div id="Previewer">
				<h1>Previewer</h1>
				<div id="preview" dangerouslySetInnerHTML={{__html: marked(this.props.text)}}></div>
			</div>
		);
	}
}

class App extends React.Component
{
	constructor(props)
	{
		super(props);
		this.state = {
			'showMeWhatYouGot': testText
		};
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(e)
	{
		e.preventDefault();
		this.setState({showMeWhatYouGot: (e.target.value)});
	}

	render()
	{
		return (
			<div className="App">
				<Editor handleChange={this.handleChange} value={this.state.showMeWhatYouGot}/>
				<Previewer text={marked(this.state.showMeWhatYouGot)}/>
			</div>
		);
	}
}

export default App;
