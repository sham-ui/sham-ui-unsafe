/**
 * This function is being used for unsafe `innerHTML` insertion of HTML into DOM.
 * Code looks strange. I know. But it is possible minimalistic implementation of.
 * @inner
 * @param {Comment} component
 * @param root {Element} Node there to insert unsafe html.
 * @param nodes {Array} List of already inserted html nodes for remove.
 * @param html {string} Unsafe html to insert.
 */
function unsafe( component, root, nodes, html ) {
    let j, i = nodes.length, element = document.createElement( 'div' );
    element.innerHTML = html;

    while ( i-- > 0 ) {
        nodes[ i ].parentNode.removeChild( nodes.pop() );
    }

    for ( i = j = element.childNodes.length - 1; j >= 0; j-- ) {
        nodes.push( element.childNodes[ j ] );
    }

    ++i;
    if ( root.nodeType === 8 ) {
        if ( root.parentNode ) {
            while ( i-- > 0 ) {
                root.parentNode.insertBefore( nodes[ i ], root );
            }
        }
    } else {
        while ( i-- > 0 ) {
            root.appendChild( nodes[ i ] );
        }
    }
}

/**
 * Registry runtime for {% unsafe %} in DI
 * @param {Object} DI App DI container
 * @example
 * import { createDI, start } from 'sham-ui-unsafe'
 * import setupUnsafe from 'sham-ui-unsafe'
 *
 *  const DI = createDI();
 *  setupUnsafe( DI );
 *  // ...
 *  start( DI );
 */
export default function setupUnsafe( DI ) {
    DI.resolve( 'sham-ui:dom' ).unsafe = unsafe;
}
