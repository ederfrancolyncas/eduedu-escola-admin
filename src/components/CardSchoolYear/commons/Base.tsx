import { Card } from '@mantine/core'

type componentProps = {
    children?: any;
};

export function BaseCard({ children }: componentProps) {
    return (
        <Card
            shadow="sm"
            padding="lg"
            radius="md"
            style={{ height: '100%', padding: '40px' }}
        >
            {children}
        </Card>
    )
}