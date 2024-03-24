export function Icon({ iconData }) {
    return (
        <div className='icon'>
            <img className={`menu-icon icon-hover ${iconData.style}`}
                src={iconData.src}
                alt={iconData.alt}
            />
        </div>
    )
}