import React, { useState, useEffect } from 'react'
import { productController } from '../ProductController'
import { IProduct } from '../Product'
import { Loading, Tree } from '@geist-ui/react'

import { eventEmitter, events } from '../../utils/events'

function ProductList({ ...props }) {

    const [products, setProducts] = useState<[IProduct?]>([])
    const [loading, setLoading] = useState<boolean>(false)

    const handleProductClick = (product?:IProduct) => {
        eventEmitter.emit(events.content, {type:'Urunler', payload: product})
    }

    useEffect(() => {
        const onFindAllProducts = async () => {
            setLoading(true)
            try {
                const result = await productController.findAll()
                setProducts(result)
            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false)
            }
        }
        onFindAllProducts()

        eventEmitter.on(events.listAllProducts, onFindAllProducts)

        return () => {
            eventEmitter.removeAllListeners(events.listAllProducts)
        }
    }, [])

    if (loading) {
        return (
            <Loading />
        )
    }

    return (
        <Tree.Folder extra={products.length.toString()} name="Urunler">
            {products && products.length > 0 &&
                products.map((product, index) => (
                    <Tree.File onClick={() => { handleProductClick(product)}} key={index} name={product!.text} />
                ))
            }
        </Tree.Folder>
    );
}

export default ProductList
