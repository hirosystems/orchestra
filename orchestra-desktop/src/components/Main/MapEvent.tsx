import { Timeline, StyledOcticon } from '@primer/react'
import { DiffIcon } from '@primer/octicons-react'
import styled from "styled-components"
import { MapDeleteEvent, MapInsertEvent, MapUpdateEvent } from '../../states/NetworkingState';

export const Container = styled.div`
    color: rgba(255, 255, 255, 0.8);
    font-size: 24px;
    font-weight: 600;
    letter-space: 0.03em;
    margin-top: 24px;
    cursor: default;
`

const MapEvent = (props: { event: MapUpdateEvent | MapInsertEvent | MapDeleteEvent }) => {
    let icon = DiffIcon;
    let color = 'success.emphasis';
    let label = '';
    if ('Delete' in props.event) {
        color = 'danger.emphasis';
        label = `Entry keyed with ${props.event.Delete.deleted_key} deleted`
    } else if ('Update' in props.event) {
        color = 'accent.emphasis';
        label = `Entry keyed with ${props.event.Update.key} updated with value ${props.event.Update.updated_value}`
    } else if ('Insert' in props.event) {
        label = `Entry keyed with ${props.event.Insert.inserted_key} inserted with value ${props.event.Insert.inserted_value}`
    }

    return (
        <Timeline.Item>
            <Timeline.Badge sx={{ bg: color }}>
                <StyledOcticon icon={icon} sx={{ color: 'fg.onEmphasis' }} />
            </Timeline.Badge>
            <Timeline.Body sx={{ color: 'fg.onEmphasis' }}>{label}</Timeline.Body>
        </Timeline.Item>
    );
};

export { MapEvent };