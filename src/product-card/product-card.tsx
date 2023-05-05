import * as React from 'react';
import {
    Card,
    StyledBody,
    StyledAction,
    StyledThumbnail,
} from 'baseui/card';
import { Avatar } from "baseui/avatar";
import { Button } from 'baseui/button';
import PropTypes from 'prop-types'

export class ProductCard extends React.Component<any, any> {

    constructor(props: any) {
        super(props)
        this.state = {
            isShown: this.props.productImage,
            mainPicture: this.props.productImage
        }
        this.imageChange = this.imageChange.bind(this);
    }
    overrides = {
        Root: {
            style: {
                width: '328px',
                margin: 0
            }
        },
        Contents: {
            style: ({ $theme }) => ({
                margin: 0
            })
        }
    }
    imageChange(img = this.state.mainPicture) {
        this.setState({ isShown: img })
    }
    MXN = Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" })
    render() {
        return (
            <section>
                <Card overrides={this.overrides} >
                    <StyledBody>
                        <div style={{ maxHeight: "200px", overflow: "hidden", margin: "-16px -16px 0 -16px" }}>
                            <img src={this.state.isShown} alt={this.props.productName} style={{
                                objectFit: "cover", height: "100%",
                                width: "100%", translate: "0 -50%"
                            }} />
                        </div>
                        {this.props.productVariants.length > 0 && (
                            <div style={{ display: "flex", justifyContent: "center" }}>
                                {this.props.productVariants.map((url: any, key: number) => (
                                    <div key={key} style={{ padding: "4px" }} onMouseOver={() => this.imageChange({ url })} onMouseLeave={() => this.imageChange()} >
                                        <Avatar name="Jane Doe" size="16px" src={url} />
                                    </div>
                                ))}
                            </div>
                        )}
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <h2 style={{ marginBottom: 0 }}>{this.props.productName}</h2>  <h4 style={{ marginBottom: 0 }}>{this.MXN.format(this.props.productPrice)}</h4>
                        </div>
                        <p>{this.props.productDescription}</p>
                    </StyledBody>
                    <StyledAction>
                        <Button overrides={{ BaseButton: { style: { width: '100%' } } }}>
                            Agregar al carrito
                        </Button>
                    </StyledAction>
                </Card>

                <br />

                <Card
                    overrides={{
                        Root: { style: { width: '328px', position: "relative" } },
                        Title: {
                            style: ({ $theme }) => ({ textAlign: "center" })
                        }
                    }}
                    title={this.props.productName}
                >
                    <StyledThumbnail
                        src={this.state.isShown}
                    />
                    <StyledBody>
                        <p>{this.props.productDescription}</p>
                        <h3>{this.MXN.format(this.props.productPrice)}</h3>
                    </StyledBody>
                    <StyledAction>
                        <Button overrides={{ BaseButton: { style: { height: "40px", borderRadius: "12px", position: "absolute", bottom: "12px", right: "12px" } } }}>
                            Agregar al carrito
                        </Button>
                    </StyledAction>
                </Card>
                <br />
            </section>
        );
    }

    static propTypes = {
        productName: PropTypes.string.isRequired,
        productPrice: PropTypes.number
    }

    static defaultProps = {
        productPrice: 10.20,
        productDescription: "Proin ut dui sed metus pharetra hend rerit vel non mi. Nulla ornare faucibus ex, non facilisis nisl.",
        productName: "Prueba de Producto",
        productImage: "https://source.unsplash.com/user/erondu/700x1400",
        productVariants: ["https://source.unsplash.com/user/erondu/701x1401", "https://placekitten.com/700/1400", "https://source.unsplash.com/user/erondu/700x1402"]
        //productnVariant: 
    }
}