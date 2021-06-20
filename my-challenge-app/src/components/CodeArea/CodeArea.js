import React, {useEffect, useState, useRef} from 'react';
import PropTypes from 'prop-types';
import AceEditor from 'react-ace';
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-monokai";
import './CodeArea.css';


function CodeArea(props) {
	const editorWrapper = useRef(null)	
	const [resizeYpivot, setResizeYpivot] = useState(0)
	const [codeCurrentHeight, setCodeCurrentHeight] = useState(0)
	const [resizing, setResizing] = useState(false)


	useEffect(() => {
		const onMouseUp = () => {
			if( resizing ){
				setResizing(false);
				document.body.style.cursor = "auto";
				document.body.style.userSelect = "auto";
				}
			}

		const onMouseMove = (event) => {
				if( resizing === true ){

						if( event.clientY > resizeYpivot ){

							const nh = event.clientY - resizeYpivot;
							
							if ( nh + codeCurrentHeight <= 259 )
								editorWrapper.current.style.height = codeCurrentHeight + nh + "px";
								document.getElementsByClassName("chart-wrapper")[0].style.height = "265px"
								
						}else{
							
							const nh = resizeYpivot - event.clientY;
							editorWrapper.current.style.height = codeCurrentHeight - nh + "px";
							document.getElementsByClassName("chart-wrapper")[0].style.height = "420px";
						}
							
				}
		}

			document.body.addEventListener('mousemove', onMouseMove);
			document.body.addEventListener('mouseup', onMouseUp);

			return () => {
	          	document.body.removeEventListener('mouseup', onMouseUp);
				document.body.removeEventListener('mousemove', onMouseMove);
			}

	}, [resizing, resizeYpivot, codeCurrentHeight])

	const onMouseDown = ({target}) => {

		setResizeYpivot(target.offsetParent.offsetTop + target.offsetTop);
		const sizing = editorWrapper.current.style.height || "235px"
		setCodeCurrentHeight(parseInt(sizing, 10));

		setResizing(true);
		document.body.style.cursor = "row-resize";
		document.body.style.userSelect = "none";
	}

		return (
			<div 
				className = "editor-wrapper"
				ref 	  = { (el) =>  {return editorWrapper.current = el} }>
				<AceEditor
				    mode            = "javascript"
				    theme           = "monokai"
				    name            = "custom_ace_editor"
				    width           = "100%"
				    onChange        = {props.onChange}
				    height          = "100%"
				    fontSize        = "15px"
				    value           = {props.value}
				    showPrintMargin = {false}
				    wrapEnabled     = {true}
				    editorProps     = {{$blockScrolling: true}}
					style           = {{lineHeight: '24px'}}
				/>
	  			<span
	  				className    = "resize-btn"
	  				onMouseDown  = {onMouseDown}>
	  			</span>
  			</div>
		);
	
};

CodeArea.propTypes = {
	codeValue: PropTypes.string,
	value: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired
};

export default CodeArea;