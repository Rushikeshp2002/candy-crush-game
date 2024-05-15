import { dragDrop, dragEnd, dragStart } from "../store";
import { useAppDispatch } from "../store/hooks";

function Tile({ candy, candyId }: { candy: string; candyId: number }) {
  const dispatch = useAppDispatch();
  return (
    <div
      className="lg:h-16 lg:w-24 md:14 md:w-20 flex justify-center items-center my-1.5 md:-mx-1  rounded-lg select-none candy transition-transform duration-500 ease-in-out animate-bounceDown"
      style={{...window.innerWidth<400 &&{marginLeft:"8px"}}}
      //  style={{boxShadow:"inset 2px 2px 5px #4823dd, inset -2px -2px 5px #aaaab7bb"}}
      // style={{boxShadow: "#062525 3px 3px 6px 0px inset, #aaaab7bb -3px -3px 6px 1px inset;"}}
    >
      {candy && (
        <img
          src={candy}
          alt={candy}
          className="lg:h-14 lg:w-14 md:h-12 md:w-12 cursor-grab"
          style={{...(window.innerWidth < 400 && { width: "2.1rem", height:"2.1rem"})}}
          candy-id={candyId}
          draggable={true}
          onDragStart={(e)=> dispatch(dragStart(e.target))}
          onDragOver={(e)=> e.preventDefault()}
          onDragEnter={(e)=> e.preventDefault()}
          onDragLeave={(e)=> e.preventDefault()}
          onDrop={(e)=>dispatch(dragDrop(e.target))}
          onDragEnd={()=>dispatch(dragEnd())}
        />
      )}
    </div>
  );
}

export default Tile;
