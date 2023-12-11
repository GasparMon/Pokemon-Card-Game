import { useEffect, useState } from "react";
import "../Card/Card.modules.css";
import { useDispatch, useSelector } from "react-redux";
import {
  buttonActive,
  butttonInactive,
  change,
  match,
  validation,
} from "../../redux/action_types";

export default function Card(props) {
  const dispatch = useDispatch();
  const matcher = useSelector((state) => state.match);

  const handleStatus = () => {
    dispatch(buttonActive());

    if (!props.status) {
      dispatch(change(props));
      dispatch(match(props));
    }

    if (matcher.length === 1) {
      setTimeout(() => {
        dispatch(validation());
      }, 1000);
    }

    setTimeout(() => {
      dispatch(butttonInactive());
    }, 1001);
  };

  const play = () => {
    if (!props.status) {
      return (
        <div id="card-unknow">
          <button
            onClick={handleStatus}
            value={props}
            disabled={props.buttonActive}
          ></button>
        </div>
      );
    } else {
      return (
        <div id="card-container" className={props.status ? 'selected' : ''}>
          <div id="character">
            <img src={props.image} />
          </div>
          <div id="name">
            <h1>{props.name}</h1>
          </div>
        </div>
      );
    }
  };

  return <>{play(props)}</>;
}
